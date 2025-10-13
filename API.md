# API Documentation

This document provides detailed technical information about the MCP Registry Server's implementation and the underlying registry API.

## Server Architecture

### Components

```
┌─────────────────────┐
│   MCP Client        │
│  (Claude, etc.)     │
└──────────┬──────────┘
           │ Stdio Transport
           │ (JSON-RPC 2.0)
┌──────────▼──────────┐
│  MCP Registry       │
│  Server             │
│  (This Package)     │
└──────────┬──────────┘
           │ HTTPS
           │
┌──────────▼──────────┐
│  MCP Registry API   │
│  (registry.model    │
│  contextprotocol.io)│
└─────────────────────┘
```

### Technology Stack

- **Language**: TypeScript 5.7+
- **Runtime**: Node.js 18+
- **Protocol**: MCP (Model Context Protocol)
- **Transport**: Stdio (stdin/stdout)
- **Validation**: Zod
- **HTTP Client**: Native `fetch` API

## MCP Registry API Reference

Base URL: `https://registry.modelcontextprotocol.io`

### Endpoints

#### `GET /v0/servers`

List all registered MCP servers with optional filtering.

**Query Parameters:**
- `cursor` (string, optional): Pagination cursor
- `limit` (integer, optional): Max items to return
- `search` (string, optional): Search server names
- `updated_since` (string, optional): RFC3339 timestamp
- `version` (string, optional): Filter by version (`"latest"`)

**Response:**
```typescript
{
  servers: Array<{
    server: ServerDetail;
    _meta: MetaData;
  }>;
  metadata?: {
    count: number;
    nextCursor?: string;
  };
}
```

#### `GET /v0/servers/{serverName}/versions`

List all versions of a specific server.

**Path Parameters:**
- `serverName` (string): URL-encoded server name

**Response:**
```typescript
{
  servers: Array<{
    server: ServerDetail;
    _meta: MetaData;
  }>;
}
```

#### `GET /v0/servers/{serverName}/versions/{version}`

Get details for a specific server version.

**Path Parameters:**
- `serverName` (string): URL-encoded server name
- `version` (string): Version string or `"latest"`

**Response:**
```typescript
{
  server: ServerDetail;
  _meta: MetaData;
}
```

#### `GET /v0/health`

Check registry health status.

**Response:**
```typescript
{
  status: "ok" | "error";
  timestamp?: string;
}
```

## Type Definitions

### ServerDetail

Core server information.

```typescript
interface ServerDetail {
  name: string;                    // Reverse-DNS format (e.g., "io.github.user/server")
  description: string;             // Human-readable description
  version: string;                 // Semantic version
  title?: string;                  // Display name
  websiteUrl?: string;             // Homepage URL
  repository?: Repository;         // Source repository
  packages?: Package[];            // Installation packages
  icons?: Icon[];                  // Display icons
  remotes?: Transport[];           // Remote transports
  _meta?: MetaData;               // Extension metadata
}
```

### Repository

Source code repository information.

```typescript
interface Repository {
  url: string;        // Repository URL
  source: string;     // Hosting service (e.g., "github")
  id?: string;        // Repository ID
  subfolder?: string; // Path within monorepo
}
```

### Package

Installation package configuration.

```typescript
interface Package {
  registryType: string;              // "npm", "pypi", "oci", etc.
  registryBaseUrl?: string;          // Registry URL
  identifier: string;                // Package name or URL
  version?: string;                  // Specific version
  fileSha256?: string;               // File integrity hash
  runtimeHint?: string;              // Runtime suggestion
  transport: Transport;              // Transport configuration
  runtimeArguments?: Argument[];     // Runtime args
  packageArguments?: Argument[];     // Package args
  environmentVariables?: KeyValueInput[];
}
```

### Transport

Communication protocol configuration.

```typescript
type Transport = StdioTransport | StreamableHttpTransport | SseTransport;

interface StdioTransport {
  type: "stdio";
}

interface StreamableHttpTransport {
  type: "streamable-http";
  url: string;
  headers?: KeyValueInput[];
}

interface SseTransport {
  type: "sse";
  url: string;
  headers?: KeyValueInput[];
}
```

### MetaData

Registry and publisher metadata.

```typescript
interface MetaData {
  "io.modelcontextprotocol.registry/publisher-provided"?: Record<string, unknown>;
  "io.modelcontextprotocol.registry/official"?: {
    status: "active" | "deprecated" | "deleted";
    publishedAt: string;
    updatedAt?: string;
    isLatest: boolean;
  };
  [key: string]: unknown;
}
```

## Tool Schemas

### list_servers

**Input Schema:**
```typescript
{
  cursor?: string;
  limit?: number;
  search?: string;
  updated_since?: string;
  version?: "latest";
}
```

**Output Schema:**
```typescript
{
  servers: Array<{
    name: string;
    description: string;
    version: string;
    title?: string;
    websiteUrl?: string;
    repository?: {
      url: string;
      source: string;
    };
  }>;
  metadata?: {
    count: number;
    nextCursor?: string;
  };
}
```

### list_server_versions

**Input Schema:**
```typescript
{
  serverName: string;
}
```

**Output Schema:**
```typescript
{
  servers: Array<{
    name: string;
    version: string;
    publishedAt?: string;
    isLatest?: boolean;
  }>;
}
```

### get_server

**Input Schema:**
```typescript
{
  serverName: string;
  version: string;
}
```

**Output Schema:**
```typescript
{
  name: string;
  description: string;
  version: string;
  title?: string;
  websiteUrl?: string;
  repository?: Repository;
  packages?: Package[];
  icons?: Icon[];
  metadata?: {
    status?: string;
    publishedAt?: string;
    updatedAt?: string;
    isLatest?: boolean;
  };
}
```

### health_check

**Input Schema:**
```typescript
{}
```

**Output Schema:**
```typescript
{
  status: string;
  timestamp?: string;
}
```

## Error Handling

The server implements comprehensive error handling:

### Network Errors

```typescript
{
  content: [{
    type: "text",
    text: "Error listing servers: Registry API error: 503 Service Unavailable"
  }],
  isError: true
}
```

### Invalid Server Names

```typescript
{
  content: [{
    type: "text",
    text: "Error getting server foo/bar@1.0.0: Registry API error: 404 Not Found"
  }],
  isError: true
}
```

### Malformed Requests

Invalid tool arguments are caught by Zod validation before execution.

## Pagination

The registry uses cursor-based pagination:

1. **Initial request**: Omit `cursor` parameter
2. **Subsequent requests**: Use `nextCursor` from previous response
3. **End of results**: `nextCursor` is `null` or empty

**Important**: Always treat cursors as opaque strings. Never construct or modify cursor values manually.

## Rate Limiting

The server does not implement client-side rate limiting. The registry API may enforce rate limits:

- Monitor for `429 Too Many Requests` responses
- Implement exponential backoff if needed
- Consider caching responses for frequently accessed data

## Security Considerations

### Input Validation

All inputs are validated using Zod schemas before processing:
- Type checking
- Format validation
- Required field enforcement

### URL Encoding

Server names are properly URL-encoded before making API requests:
```typescript
const encodedName = encodeURIComponent(serverName);
```

### No Authentication Required

Read operations don't require authentication. The server only implements read endpoints.

## Performance

### Response Times

Typical response times (depends on network):
- `list_servers`: 200-500ms
- `get_server`: 100-300ms
- `list_server_versions`: 150-400ms
- `health_check`: 50-150ms

### Optimization Opportunities

Future enhancements:
- Response caching
- Connection pooling
- Compression support
- Parallel requests

## Versioning

The server follows semantic versioning:
- **Major**: Breaking changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes

## Extending the Server

To add new tools:

```typescript
server.registerTool(
  'tool_name',
  {
    title: 'Tool Title',
    description: 'Tool description',
    inputSchema: {
      param: z.string().describe('Parameter description'),
    },
    outputSchema: {
      result: z.string(),
    },
  },
  async (args) => {
    // Implementation
    return {
      content: [{ type: 'text', text: 'Result' }],
      structuredContent: { result: 'value' },
    };
  }
);
```

## References

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP Registry API](https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/api/generic-registry-api.md)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Zod Documentation](https://zod.dev/)

## Support

For technical questions:
- GitHub Issues: Report bugs and feature requests
- API Documentation: Check the official registry docs
- MCP Discord: Join the community discussions
