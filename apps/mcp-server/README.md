# Plus UI MCP Server

Model Context Protocol (MCP) server for the Plus UI component library. This server provides intelligent component discovery, usage examples, and code generation for Plus UI components across multiple frameworks.

## Features

🔍 **Component Discovery** - Automatically discovers all Plus UI components from the library's metadata
📚 **Usage Examples** - Generates framework-specific code examples (HTML, React, Vue, Svelte, Angular)
🔧 **Code Generation** - Creates component code with specified props and slots
✅ **Usage Validation** - Validates component usage and suggests improvements
🏷️ **Metadata Access** - Full access to component properties, slots, events, and CSS variables
🎯 **Smart Search** - Find components by functionality, properties, or category

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Build the server
npm run build

# Start the MCP server
npm start
```

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run manually
docker build -t plusui-mcp .
docker run -p 3000:3000 -v ../library:/library:ro plusui-mcp
```

## MCP Tools

### `generate_component_code`
Generate code for using a Plus UI component with specified properties.

```json
{
  "component": "plus-button",
  "framework": "react",
  "props": {
    "kind": "filled",
    "status": "primary",
    "size": "lg"
  },
  "slots": {
    "default": "Click Me",
    "prefix": "🚀"
  }
}
```

### `search_components`
Search for components by functionality or description.

```json
{
  "query": "button",
  "category": "action"
}
```

### `validate_component_usage`
Validate component usage and get improvement suggestions.

```json
{
  "code": "<plus-button kind=\"filled\">Submit</plus-button>",
  "framework": "html"
}
```

### `get_component_examples`
Get comprehensive usage examples for a specific component.

```json
{
  "component": "plus-button",
  "framework": "react",
  "useCase": "loading state"
}
```

## MCP Resources

### `plusui://components/list`
Complete list of all available Plus UI components with metadata.

### `plusui://components/{component-name}`
Detailed information about a specific component including:
- Properties and their types
- Available slots
- Custom events
- CSS custom properties
- Usage examples

### `plusui://components/styles`
Global CSS styles and custom properties for the component library.

## Configuration

The server can be configured via environment variables:

- `LIBRARY_PATH` - Path to the Plus UI library (default: `../library`)
- `NODE_ENV` - Environment mode (`development` or `production`)

## Integration with Claude Code

To use this MCP server with Claude Code, add it to your MCP configuration:

```json
{
  "mcpServers": {
    "plusui": {
      "command": "node",
      "args": ["/path/to/plusui-mcp-server/dist/index.js"],
      "env": {
        "LIBRARY_PATH": "/path/to/plus-ui/library"
      }
    }
  }
}
```

## API Reference

### Component Metadata Structure

```typescript
interface ComponentMetadata {
  name: string;           // Human-readable name
  tagName: string;        // HTML tag name (e.g., "plus-button")
  description: string;    // Component description
  category: string;       // Component category
  properties: ComponentProperty[];
  slots: ComponentSlot[];
  events: ComponentEvent[];
  methods: ComponentMethod[];
  cssProperties: CSSProperty[];
  examples: ComponentExample[];
}
```

### Supported Frameworks

- **HTML** - Vanilla HTML with web components
- **React** - JSX with React wrapper components
- **Vue** - Vue.js template syntax
- **Svelte** - Svelte component syntax
- **Angular** - Angular template with CUSTOM_ELEMENTS_SCHEMA

## Development

### Project Structure

```
src/
├── index.ts                    # Main MCP server
├── services/
│   ├── component-service.ts    # Component metadata extraction
│   └── example-generator.ts    # Code generation and examples
```

### Building

```bash
npm run build    # Compile TypeScript
npm run dev      # Watch mode for development
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../library/LICENSE) file for details.

## Links

- [Plus UI Library](../library)
- [MCP Protocol](https://modelcontextprotocol.io)
- [Claude Code](https://claude.ai/code)