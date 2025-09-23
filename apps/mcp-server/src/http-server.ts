#!/usr/bin/env node

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { PlusUIComponentService } from './services/component-service.js';
import { ComponentExampleGenerator } from './services/example-generator.js';

class PlusUIHTTPServer {
  private app: express.Application;
  private componentService: PlusUIComponentService;
  private exampleGenerator: ComponentExampleGenerator;
  private port: number;

  constructor(port: number = 8555) {
    this.port = port;
    this.app = express();
    this.componentService = new PlusUIComponentService();
    this.exampleGenerator = new ComponentExampleGenerator();

    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));

    // CORS configuration
    this.app.use(cors({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8555', 'http://127.0.0.1:8555'],
      credentials: true,
    }));

    // Compression
    this.app.use(compression());

    // JSON parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'plusui-mcp-server',
        version: '1.0.0'
      });
    });

    // MCP endpoint
    this.app.get('/mcp', async (req, res) => {
      try {
        const server = new Server(
          {
            name: 'plusui-mcp-server',
            version: '1.0.0',
          },
          {
            capabilities: {
              resources: {},
              tools: {},
            },
          }
        );

        this.setupMCPHandlers(server);

        const transport = new SSEServerTransport('/mcp', res);
        await server.connect(transport);

        console.log('MCP client connected via HTTP');
      } catch (error) {
        console.error('Error setting up MCP connection:', error);
        res.status(500).json({ error: 'Failed to establish MCP connection' });
      }
    });

    // API endpoints for direct access
    this.app.get('/api/components', async (req, res) => {
      try {
        const components = await this.componentService.getAvailableComponents();
        res.json(components);
      } catch (error) {
        console.error('Error fetching components:', error);
        res.status(500).json({ error: 'Failed to fetch components' });
      }
    });

    this.app.get('/api/components/:name', async (req, res) => {
      try {
        const component = await this.componentService.getComponentDetails(req.params.name);
        if (!component) {
          return res.status(404).json({ error: 'Component not found' });
        }
        res.json(component);
      } catch (error) {
        console.error('Error fetching component details:', error);
        res.status(500).json({ error: 'Failed to fetch component details' });
      }
    });

    this.app.post('/api/search', async (req, res) => {
      try {
        const { query, category } = req.body;
        const results = await this.componentService.searchComponents(query, category);
        res.json(results);
      } catch (error) {
        console.error('Error searching components:', error);
        res.status(500).json({ error: 'Failed to search components' });
      }
    });

    this.app.get('/api/styles', async (req, res) => {
      try {
        const styles = await this.componentService.getGlobalStyles();
        res.type('text/css').send(styles);
      } catch (error) {
        console.error('Error fetching styles:', error);
        res.status(500).json({ error: 'Failed to fetch styles' });
      }
    });

    // Static info endpoint
    this.app.get('/', (req, res) => {
      res.json({
        name: 'Plus UI MCP Server',
        version: '1.0.0',
        description: 'MCP Server for Plus UI Library - provides component discovery and usage assistance',
        endpoints: {
          mcp: '/mcp',
          health: '/health',
          components: '/api/components',
          search: '/api/search',
          styles: '/api/styles'
        },
        documentation: 'https://github.com/plus-ui/library'
      });
    });
  }

  private setupMCPHandlers(server: Server) {
    // List available resources
    server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const components = await this.componentService.getAvailableComponents();

      return {
        resources: [
          {
            uri: 'plusui://components/list',
            mimeType: 'application/json',
            name: 'Plus UI Components List',
            description: 'Complete list of available Plus UI components with their metadata'
          },
          {
            uri: 'plusui://components/styles',
            mimeType: 'text/css',
            name: 'Plus UI Styles',
            description: 'Global styles and CSS variables for Plus UI components'
          },
          ...components.map(component => ({
            uri: `plusui://components/${component.tagName}`,
            mimeType: 'application/json',
            name: `${component.name} Component`,
            description: component.description || `Plus UI ${component.name} component documentation`
          }))
        ]
      };
    });

    // Read specific resources
    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;

      if (uri === 'plusui://components/list') {
        const components = await this.componentService.getAvailableComponents();
        return {
          contents: [
            {
              uri: uri,
              mimeType: 'application/json',
              text: JSON.stringify(components, null, 2)
            }
          ]
        };
      }

      if (uri === 'plusui://components/styles') {
        const styles = await this.componentService.getGlobalStyles();
        return {
          contents: [
            {
              uri: uri,
              mimeType: 'text/css',
              text: styles
            }
          ]
        };
      }

      if (uri.startsWith('plusui://components/')) {
        const componentName = uri.replace('plusui://components/', '');
        const component = await this.componentService.getComponentDetails(componentName);

        if (!component) {
          throw new McpError(ErrorCode.InvalidRequest, `Component ${componentName} not found`);
        }

        return {
          contents: [
            {
              uri: uri,
              mimeType: 'application/json',
              text: JSON.stringify(component, null, 2)
            }
          ]
        };
      }

      throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    });

    // List available tools
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'generate_component_code',
            description: 'Generate code for using a Plus UI component with specified props and configuration',
            inputSchema: {
              type: 'object',
              properties: {
                component: {
                  type: 'string',
                  description: 'Component name (e.g., "plus-button", "plus-modal")'
                },
                framework: {
                  type: 'string',
                  enum: ['html', 'react', 'vue', 'svelte', 'angular'],
                  description: 'Target framework for code generation'
                },
                props: {
                  type: 'object',
                  description: 'Component properties and their values'
                },
                slots: {
                  type: 'object',
                  description: 'Component slots and their content'
                }
              },
              required: ['component', 'framework']
            }
          },
          {
            name: 'search_components',
            description: 'Search for Plus UI components by functionality, props, or description',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query (e.g., "button", "modal", "input validation")'
                },
                category: {
                  type: 'string',
                  enum: ['action', 'input', 'feedback', 'display', 'layout', 'navigation'],
                  description: 'Component category to filter by'
                }
              },
              required: ['query']
            }
          },
          {
            name: 'validate_component_usage',
            description: 'Validate component usage and suggest improvements',
            inputSchema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'Component usage code to validate'
                },
                framework: {
                  type: 'string',
                  enum: ['html', 'react', 'vue', 'svelte', 'angular'],
                  description: 'Framework context for validation'
                }
              },
              required: ['code']
            }
          },
          {
            name: 'get_component_examples',
            description: 'Get comprehensive usage examples for a specific component',
            inputSchema: {
              type: 'object',
              properties: {
                component: {
                  type: 'string',
                  description: 'Component name (e.g., "plus-button")'
                },
                framework: {
                  type: 'string',
                  enum: ['html', 'react', 'vue', 'svelte', 'angular'],
                  description: 'Framework for examples'
                },
                useCase: {
                  type: 'string',
                  description: 'Specific use case (e.g., "form submission", "navigation", "loading state")'
                }
              },
              required: ['component']
            }
          }
        ]
      };
    });

    // Handle tool calls
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'generate_component_code':
            return await this.handleGenerateCode(args);

          case 'search_components':
            return await this.handleSearchComponents(args);

          case 'validate_component_usage':
            return await this.handleValidateUsage(args);

          case 'get_component_examples':
            return await this.handleGetExamples(args);

          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${error}`);
      }
    });
  }

  private async handleGenerateCode(args: any) {
    const { component, framework, props = {}, slots = {} } = args;
    const code = await this.exampleGenerator.generateComponentCode(component, framework, props, slots);

    return {
      content: [
        {
          type: 'text',
          text: `Generated ${framework} code for ${component}:\n\n\`\`\`${framework === 'html' ? 'html' : framework}\n${code}\n\`\`\``
        }
      ]
    };
  }

  private async handleSearchComponents(args: any) {
    const { query, category } = args;
    const results = await this.componentService.searchComponents(query, category);

    return {
      content: [
        {
          type: 'text',
          text: `Found ${results.length} component(s) matching "${query}":\n\n${results.map(component =>
            `**${component.name}** (${component.tagName})\n${component.description}\nCategory: ${component.category}\n`
          ).join('\n')}`
        }
      ]
    };
  }

  private async handleValidateUsage(args: any) {
    const { code, framework = 'html' } = args;
    const validation = await this.componentService.validateComponentUsage(code, framework);

    return {
      content: [
        {
          type: 'text',
          text: `Validation results:\n\n${validation.isValid ? '✅ Valid usage' : '❌ Issues found'}\n\n${validation.suggestions.join('\n')}`
        }
      ]
    };
  }

  private async handleGetExamples(args: any) {
    const { component, framework = 'html', useCase } = args;
    const examples = await this.exampleGenerator.getComponentExamples(component, framework, useCase);

    return {
      content: [
        {
          type: 'text',
          text: `Examples for ${component}:\n\n${examples.map(example =>
            `**${example.title}**\n${example.description}\n\n\`\`\`${framework === 'html' ? 'html' : framework}\n${example.code}\n\`\`\`\n`
          ).join('\n')}`
        }
      ]
    };
  }

  public start() {
    this.app.listen(this.port, '0.0.0.0', () => {
      console.log(`Plus UI HTTP MCP Server running on http://0.0.0.0:${this.port}`);
      console.log(`Health check: http://0.0.0.0:${this.port}/health`);
      console.log(`MCP endpoint: http://0.0.0.0:${this.port}/mcp`);
      console.log(`API endpoints: http://0.0.0.0:${this.port}/api/components`);
    });
  }
}

// Check if we need HTTP mode
const mode = process.env.SERVER_MODE || 'stdio';
const port = parseInt(process.env.PORT || '8555');

if (mode === 'http') {
  const httpServer = new PlusUIHTTPServer(port);
  httpServer.start();
} else {
  // Fallback to stdio mode
  const { Server } = await import('@modelcontextprotocol/sdk/server/index.js');
  const { StdioServerTransport } = await import('@modelcontextprotocol/sdk/server/stdio.js');
  const { PlusUIComponentService } = await import('./services/component-service.js');

  // Original stdio implementation...
  console.error('Plus UI MCP Server running on stdio');
}