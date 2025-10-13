#!/usr/bin/env node

/**
 * MCP Registry Server
 * 
 * An MCP server that provides tools to query the Model Context Protocol registry.
 * Implements endpoints for listing servers, getting server details, and health checks.
 */

import { createRequire } from "node:module";
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const require = createRequire(import.meta.url);
const packageJson = require("../package.json");

import type {
  ServerList,
  ServerResponse,
  HealthCheckResponse,
} from './types.js';

const REGISTRY_BASE_URL = 'https://registry.modelcontextprotocol.io';

/**
 * Fetch data from the registry API with error handling
 */
async function fetchFromRegistry<T>(path: string): Promise<T> {
  const url = `${REGISTRY_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Registry API error: ${response.status} ${response.statusText}. ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

/**
 * Create and configure the MCP server
 */
function createServer(): McpServer {
  const server = new McpServer({
    name: packageJson.name,
    version: packageJson.version,
  });

  // Tool: List all servers
  server.registerTool(
    'list_servers',
    {
      title: 'List MCP Servers',
      description: 'List all registered MCP servers from the registry with optional filtering and pagination',
      inputSchema: {
        cursor: z.string().optional().describe('Pagination cursor from previous response'),
        limit: z.number().int().positive().optional().describe('Maximum number of servers to return'),
        search: z.string().optional().describe('Case-insensitive substring search on server names'),
        updated_since: z.string().optional().describe('Filter servers updated after this RFC3339 timestamp'),
        version: z.enum(['latest']).optional().describe('Filter by version (currently only "latest" is supported)'),
      },
      outputSchema: {
        servers: z.array(z.object({
          name: z.string(),
          description: z.string(),
          version: z.string(),
          title: z.string().optional(),
          websiteUrl: z.string().optional(),
          repository: z.object({
            url: z.string(),
            source: z.string(),
          }).optional(),
        })),
        metadata: z.object({
          count: z.number(),
          nextCursor: z.string().optional(),
        }).optional(),
      },
    },
    async (args) => {
      try {
        const params = new URLSearchParams();
        
        if (args.cursor) params.append('cursor', args.cursor);
        if (args.limit) params.append('limit', args.limit.toString());
        if (args.search) params.append('search', args.search);
        if (args.updated_since) params.append('updated_since', args.updated_since);
        if (args.version) params.append('version', args.version);

        const queryString = params.toString();
        const path = `/v0/servers${queryString ? `?${queryString}` : ''}`;
        
        const data = await fetchFromRegistry<ServerList>(path);
        
        // Transform the response to a simplified format
        const servers = data.servers.map(item => ({
          name: item.server.name,
          description: item.server.description,
          version: item.server.version,
          ...(item.server.title && { title: item.server.title }),
          ...(item.server.websiteUrl && { websiteUrl: item.server.websiteUrl }),
          ...(item.server.repository && {
            repository: {
              url: item.server.repository.url,
              source: item.server.repository.source,
            },
          }),
        }));

        const output = {
          servers,
          ...(data.metadata && {
            metadata: {
              count: data.metadata.count || 0,
              ...(data.metadata.nextCursor && { nextCursor: data.metadata.nextCursor }),
            },
          }),
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(output, null, 2),
            },
          ],
          structuredContent: output,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [
            {
              type: 'text',
              text: `Error listing servers: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Tool: List server versions
  server.registerTool(
    'list_server_versions',
    {
      title: 'List Server Versions',
      description: 'List all available versions for a specific MCP server',
      inputSchema: {
        serverName: z.string().describe('Server name (e.g., "io.modelcontextprotocol/filesystem")'),
      },
      outputSchema: {
        servers: z.array(z.object({
          name: z.string(),
          version: z.string(),
          publishedAt: z.string().optional(),
          isLatest: z.boolean().optional(),
        })),
      },
    },
    async ({ serverName }) => {
      try {
        const encodedName = encodeURIComponent(serverName);
        const path = `/v0/servers/${encodedName}/versions`;
        
        const data = await fetchFromRegistry<ServerList>(path);
        
        const servers = data.servers.map(item => ({
          name: item.server.name,
          version: item.server.version,
          ...(item._meta?.['io.modelcontextprotocol.registry/official']?.publishedAt && {
            publishedAt: item._meta['io.modelcontextprotocol.registry/official'].publishedAt,
          }),
          ...(item._meta?.['io.modelcontextprotocol.registry/official']?.isLatest !== undefined && {
            isLatest: item._meta['io.modelcontextprotocol.registry/official'].isLatest,
          }),
        }));

        const output = { servers };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(output, null, 2),
            },
          ],
          structuredContent: output,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [
            {
              type: 'text',
              text: `Error listing versions for ${serverName}: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Tool: Get server details
  server.registerTool(
    'get_server',
    {
      title: 'Get Server Details',
      description: 'Get detailed information about a specific version of an MCP server. Use "latest" as version to get the latest version.',
      inputSchema: {
        serverName: z.string().describe('Server name (e.g., "io.modelcontextprotocol/filesystem")'),
        version: z.string().describe('Version string (e.g., "1.0.0") or "latest" for the latest version'),
      },
      outputSchema: {
        name: z.string(),
        description: z.string(),
        version: z.string(),
        title: z.string().optional(),
        websiteUrl: z.string().optional(),
        repository: z.object({
          url: z.string(),
          source: z.string(),
          id: z.string().optional(),
          subfolder: z.string().optional(),
        }).optional(),
        packages: z.array(z.any()).optional(),
        icons: z.array(z.any()).optional(),
        metadata: z.object({
          status: z.string().optional(),
          publishedAt: z.string().optional(),
          updatedAt: z.string().optional(),
          isLatest: z.boolean().optional(),
        }).optional(),
      },
    },
    async ({ serverName, version }) => {
      try {
        const encodedName = encodeURIComponent(serverName);
        const encodedVersion = encodeURIComponent(version);
        const path = `/v0/servers/${encodedName}/versions/${encodedVersion}`;
        
        const data = await fetchFromRegistry<ServerResponse>(path);
        
        const output = {
          name: data.server.name,
          description: data.server.description,
          version: data.server.version,
          ...(data.server.title && { title: data.server.title }),
          ...(data.server.websiteUrl && { websiteUrl: data.server.websiteUrl }),
          ...(data.server.repository && { repository: data.server.repository }),
          ...(data.server.packages && { packages: data.server.packages }),
          ...(data.server.icons && { icons: data.server.icons }),
          ...(data._meta?.['io.modelcontextprotocol.registry/official'] && {
            metadata: data._meta['io.modelcontextprotocol.registry/official'],
          }),
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(output, null, 2),
            },
          ],
          structuredContent: output,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [
            {
              type: 'text',
              text: `Error getting server ${serverName}@${version}: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Tool: Health check
  server.registerTool(
    'health_check',
    {
      title: 'Health Check',
      description: 'Check the health status of the MCP registry',
      inputSchema: {},
      outputSchema: {
        status: z.string(),
        timestamp: z.string().optional(),
      },
    },
    async () => {
      try {
        const data = await fetchFromRegistry<HealthCheckResponse>('/v0/health');
        
        const output = {
          status: data.status,
          ...(data.timestamp && { timestamp: data.timestamp }),
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(output, null, 2),
            },
          ],
          structuredContent: output,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [
            {
              type: 'text',
              text: `Error checking registry health: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  return server;
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  
  await server.connect(transport);
  
  // Log to stderr so it doesn't interfere with MCP protocol
  console.error('MCP Registry Server running on stdio');
}

// Run the server
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
