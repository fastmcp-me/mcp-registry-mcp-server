# MCP Registry Server

[![npm version](https://badge.fury.io/js/mcp-registry-mcp-server.svg)](https://www.npmjs.com/package/mcp-registry-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Model Context Protocol (MCP) server that provides tools to query the official [MCP Registry](https://registry.modelcontextprotocol.io). This server enables AI assistants and applications to discover, search, and retrieve information about published MCP servers programmatically.

## ✨ Features

- 🔍 **List Servers**: Browse all registered MCP servers with pagination
- 🔎 **Search**: Find servers by name with filtering options
- 📦 **Version Management**: View all versions of specific servers
- 📝 **Detailed Information**: Get comprehensive server details
- 💚 **Health Checks**: Monitor registry availability

## 🚀 Quick Start

### VS Code (GitHub Copilot)

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MCP-0098FF?style=for-the-badge&logo=visualstudiocode&logoColor=ffffff)](https://insiders.vscode.dev/redirect/mcp/install?name=mcp-registry-mcp-server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%20mcp-registry-mcp-server%22%5D%7D)

**Manual Setup**: Add to your VS Code MCP settings:

```json
{
  "mcp-registry-mcp-server": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "mcp-registry-mcp-server"]
  }
}
```

### Cursor

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=mcp-registry-mcp-server&config=eyJjb21tYW5kIjoibnB4IC15IG1jcC1yZWdpc3RyeS1tY3Atc2VydmVyIn0%3D)

**Manual Setup**: Add to your Cursor MCP configuration:

```json
{
  "mcp-registry-mcp-server": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "mcp-registry-mcp-server"]
  }
}
```

### Other Clients

Sample configuration (double check your client's documentation for MCP configuration):

```json
{
  "mcp-registry-mcp-server": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "mcp-registry-mcp-server"]
  }
}
```

## 📚 How to Use

Once configured, you can ask your AI assistant natural language questions like:

- "What MCP servers are available?"
- "Search for filesystem-related MCP servers"
- "Show me the latest version of the GitHub MCP server"
- "Get details about the Slack MCP server"
- "Is the MCP registry healthy?"

The AI will automatically use the appropriate registry tools to answer your questions.

## 🛠️ Available Tools

### list_servers

Browse all registered MCP servers with optional search and pagination.

**Example prompts:**
- "List all MCP servers"
- "Search for servers related to GitHub"
- "Show me recently updated servers"

### list_server_versions

View all available versions for a specific MCP server.

**Example prompts:**
- "What versions are available for the filesystem server?"
- "Show version history for io.modelcontextprotocol/filesystem"

### get_server

Get detailed information about a specific MCP server version.

**Example prompts:**
- "Tell me about the latest filesystem server"
- "Get details for io.modelcontextprotocol/filesystem version 1.0.0"

### health_check

Check if the MCP registry is operational.

**Example prompts:**
- "Is the MCP registry working?"
- "Check registry health status"

## 🔧 Requirements

- Node.js 18.0.0 or higher
- MCP Client - Any application that supports MCP:
  - [VS Code with GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
  - [Cursor](https://cursor.com/)
  - [And many more...](https://modelcontextprotocol.io/clients)

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📖 Documentation

- [API Reference](API.md) - Detailed API documentation
- [MCP Registry](https://registry.modelcontextprotocol.io) - Official registry website

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

## 🔗 Resources

- npm Package: [https://www.npmjs.com/package/mcp-registry-mcp-server](https://www.npmjs.com/package/mcp-registry-mcp-server)
- GitHub Repository: [https://github.com/wei/mcp-registry-mcp-server](https://github.com/wei/mcp-registry-mcp-server)
- MCP Registry API: [https://registry.modelcontextprotocol.io/docs](https://registry.modelcontextprotocol.io/docs)
- MCP Documentation: [https://modelcontextprotocol.io](https://modelcontextprotocol.io/)
- Report Issues: [https://github.com/wei/mcp-registry-mcp-server/issues](https://github.com/wei/mcp-registry-mcp-server/issues)

---

Made with ❤️ by [@wei](https://github.com/wei)
