# Contributing to MCP Registry Server

Thank you for your interest in contributing to the MCP Registry Server! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details**: Node.js version, OS, etc.
- **Error messages** or logs if applicable

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

- **Clear description** of the enhancement
- **Use case** - why this would be useful
- **Possible implementation** approach (optional)
- **Alternatives considered**

### Pull Requests

1. **Fork** the repository
2. **Create a branch** for your feature/fix: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Test** your changes thoroughly
5. **Commit** with clear messages: `git commit -m 'Add amazing feature'`
6. **Push** to your fork: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Git

### Getting Started

```bash
# Clone your fork
git clone https://github.com/wei/mcp-registry-mcp-server.git
cd mcp-registry-mcp-server

# Install dependencies
npm install

# Build the project
npm run build

# Run type checking
npm run typecheck
```

## Coding Standards

### TypeScript

- Use **strict TypeScript** - all strict options are enabled
- Provide **type annotations** for function parameters and return types
- Avoid `any` types - use proper types or `unknown`
- Use **interfaces** for object shapes
- Use **type aliases** for unions and complex types

### Code Style

- **Indentation**: 2 spaces
- **Semicolons**: Use them
- **Quotes**: Single quotes for strings
- **Line length**: Keep under 100 characters when practical
- **Naming**:
  - `camelCase` for variables and functions
  - `PascalCase` for types and interfaces
  - `UPPER_CASE` for constants

### Documentation

- Add **JSDoc comments** for public functions and types
- Include **parameter descriptions** and return types
- Provide **usage examples** for complex functions
- Update **README.md** if adding new features

### Example

```typescript
/**
 * Fetch data from the registry API with error handling
 * 
 * @param path - API endpoint path (e.g., '/v0/servers')
 * @returns Promise resolving to the API response data
 * @throws Error if the API request fails
 */
async function fetchFromRegistry<T>(path: string): Promise<T> {
  // Implementation
}
```

## Testing

Currently, this project relies on:
- **Type checking**: `npm run typecheck`
- **Build verification**: `npm run build`
- **Manual testing**: Run the server and test with an MCP client

Future contributions for automated testing are welcome!

### Manual Testing

```bash
# Build and run
npm run build
node dist/index.js

# Test with Claude Desktop or another MCP client
# See README.md for configuration
```

## Project Structure

```
mcp-registry-mcp-server/
├── src/
│   ├── index.ts      # Main server implementation
│   └── types.ts      # Type definitions
├── dist/             # Compiled output (generated)
├── package.json      # Package configuration
├── tsconfig.json     # TypeScript configuration
├── README.md         # User documentation
├── CONTRIBUTING.md   # This file
└── LICENSE           # MIT License
```

## Commit Messages

Follow conventional commits format:

- `feat: add new feature`
- `fix: resolve bug in X`
- `docs: update README`
- `style: format code`
- `refactor: restructure Y`
- `test: add tests for Z`
- `chore: update dependencies`

## Pull Request Process

1. **Update documentation** if needed
2. **Update CHANGELOG.md** with your changes
3. **Ensure all checks pass** (TypeScript compilation, type checking)
4. **Request review** from maintainers
5. **Address feedback** promptly and professionally
6. **Squash commits** if requested before merging

## Areas for Contribution

### High Priority

- [ ] Automated tests (unit and integration)
- [ ] Enhanced error handling and retry logic
- [ ] Rate limiting and caching
- [ ] Support for alternative transports (HTTP, SSE)
- [ ] Performance optimizations

### Medium Priority

- [ ] CLI flags for configuration
- [ ] Logging improvements
- [ ] Metrics and monitoring
- [ ] Additional filtering options
- [ ] Documentation improvements

### Nice to Have

- [ ] Docker support
- [ ] CI/CD improvements
- [ ] Example integrations
- [ ] Video tutorials
- [ ] Translation support

## Questions?

Feel free to:
- Open an issue for discussion
- Start a GitHub Discussion
- Check existing issues and PRs

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- Repository contributors page
- CHANGELOG.md for significant contributions
- README.md acknowledgments section

Thank you for making MCP Registry Server better! 🎉
