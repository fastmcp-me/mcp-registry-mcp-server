![mcp-registry-mcp-server](https://socialify.git.ci/wei/mcp-registry-mcp-server/image?custom_language=TypeScript&description=1&font=Raleway&language=1&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU%2BTW9kZWwgQ29udGV4dCBQcm90b2NvbDwvdGl0bGU%2BPHBhdGggZD0iTTEzLjg1IDBhNC4xNiA0LjE2IDAgMCAwLTIuOTUgMS4yMTdMMS40NTYgMTAuNjZhLjgzNS44MzUgMCAwIDAgMCAxLjE4LjgzNS44MzUgMCAwIDAgMS4xOCAwbDkuNDQyLTkuNDQyYTIuNDkgMi40OSAwIDAgMSAzLjU0MSAwIDIuNDkgMi40OSAwIDAgMSAwIDMuNTQxTDguNTkgMTIuOTdsLS4xLjFhLjgzNS44MzUgMCAwIDAgMCAxLjE4LjgzNS44MzUgMCAwIDAgMS4xOCAwbC4xLS4wOTggNy4wMy03LjAzNGEyLjQ5IDIuNDkgMCAwIDEgMy41NDIgMGwuMDQ5LjA1YTIuNDkgMi40OSAwIDAgMSAwIDMuNTRsLTguNTQgOC41NGExLjk2IDEuOTYgMCAwIDAgMCAyLjc1NWwxLjc1MyAxLjc1M2EuODM1LjgzNSAwIDAgMCAxLjE4IDAgLjgzNS44MzUgMCAwIDAgMC0xLjE4bC0xLjc1My0xLjc1M2EuMjY2LjI2NiAwIDAgMSAwLS4zOTRsOC41NC04LjU0YTQuMTg1IDQuMTg1IDAgMCAwIDAtNS45bC0uMDUtLjA1YTQuMTYgNC4xNiAwIDAgMC0yLjk1LTEuMjE4Yy0uMiAwLS40MDEuMDItLjYuMDQ4YTQuMTcgNC4xNyAwIDAgMC0xLjE3LTMuNTUyQTQuMTYgNC4xNiAwIDAgMCAxMy44NSAwbTAgMy4zMzNhLjg0Ljg0IDAgMCAwLS41OS4yNDVMNi4yNzUgMTAuNTZhNC4xODYgNC4xODYgMCAwIDAgMCA1LjkwMiA0LjE4NiA0LjE4NiAwIDAgMCA1LjkwMiAwTDE5LjE2IDkuNDhhLjgzNS44MzUgMCAwIDAgMC0xLjE4LjgzNS44MzUgMCAwIDAtMS4xOCAwbC02Ljk4NSA2Ljk4NGEyLjQ5IDIuNDkgMCAwIDEtMy41NCAwIDIuNDkgMi40OSAwIDAgMSAwLTMuNTRsNi45ODMtNi45ODVhLjgzNS44MzUgMCAwIDAgMC0xLjE4Ljg0Ljg0IDAgMCAwLS41OS0uMjQ1Ii8%2BPC9zdmc%2B&name=1&owner=1&pattern=Circuit+Board&theme=Light)

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

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MCP-0098FF?style=for-the-badge&logo=visualstudiocode&logoColor=ffffff)](https://insiders.vscode.dev/redirect/mcp/install?name=mcp-registry-mcp-server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%20mcp-registry-mcp-server%22%5D%7D)
[![Install in Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=mcp-registry-mcp-server&config=eyJjb21tYW5kIjoibnB4IC15IG1jcC1yZWdpc3RyeS1tY3Atc2VydmVyIn0%3D)

### Other Clients

Sample configuration (double check the documentation of your MCP client for exact syntax and file locations):

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
