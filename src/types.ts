/**
 * Type definitions for the MCP Registry API
 * Based on the official registry API specification
 */

export interface ServerDetail {
  name: string;
  description: string;
  title?: string;
  repository?: Repository;
  version: string;
  websiteUrl?: string;
  icons?: Icon[];
  $schema?: string;
  packages?: Package[];
  remotes?: Transport[];
  _meta?: MetaData;
}

export interface Repository {
  url: string;
  source: string;
  id?: string;
  subfolder?: string;
}

export interface Icon {
  src: string;
  mimeType?: 'image/png' | 'image/jpeg' | 'image/jpg' | 'image/svg+xml' | 'image/webp';
  sizes?: string[];
  theme?: 'light' | 'dark';
}

export interface Package {
  registryType: string;
  registryBaseUrl?: string;
  identifier: string;
  version?: string;
  fileSha256?: string;
  runtimeHint?: string;
  transport: Transport;
  runtimeArguments?: Argument[];
  packageArguments?: Argument[];
  environmentVariables?: KeyValueInput[];
}

export type Transport = StdioTransport | StreamableHttpTransport | SseTransport;

export interface StdioTransport {
  type: 'stdio';
}

export interface StreamableHttpTransport {
  type: 'streamable-http';
  url: string;
  headers?: KeyValueInput[];
}

export interface SseTransport {
  type: 'sse';
  url: string;
  headers?: KeyValueInput[];
}

export type Argument = PositionalArgument | NamedArgument;

export interface BaseInput {
  description?: string;
  isRequired?: boolean;
  format?: 'string' | 'number' | 'boolean' | 'filepath';
  value?: string;
  isSecret?: boolean;
  default?: string;
  placeholder?: string;
  choices?: string[];
  variables?: Record<string, BaseInput>;
}

export interface PositionalArgument extends BaseInput {
  type: 'positional';
  valueHint?: string;
  isRepeated?: boolean;
}

export interface NamedArgument extends BaseInput {
  type: 'named';
  name: string;
  isRepeated?: boolean;
}

export interface KeyValueInput extends BaseInput {
  name: string;
}

export interface MetaData {
  'io.modelcontextprotocol.registry/publisher-provided'?: Record<string, unknown>;
  'io.modelcontextprotocol.registry/official'?: OfficialMetaData;
  [key: string]: unknown;
}

export interface OfficialMetaData {
  status: 'active' | 'deprecated' | 'deleted';
  publishedAt: string;
  updatedAt?: string;
  isLatest: boolean;
}

export interface ServerResponse {
  server: ServerDetail;
  _meta: MetaData;
}

export interface ServerList {
  servers: ServerResponse[];
  metadata?: {
    nextCursor?: string;
    count?: number;
  };
}

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp?: string;
}

export interface ErrorResponse {
  error: string;
}
