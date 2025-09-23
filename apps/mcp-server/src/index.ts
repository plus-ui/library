#!/usr/bin/env node

import path from 'path';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
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

class PlusUIMCPServer {
  private server: Server;
  private componentService: PlusUIComponentService;
  private exampleGenerator: ComponentExampleGenerator;

  constructor() {
    this.server = new Server(
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

    // Get library path from environment variable or use default
    const libraryPath = process.env.LIBRARY_PATH || path.resolve(__dirname, '../../../');

    this.componentService = new PlusUIComponentService(libraryPath);
    this.exampleGenerator = new ComponentExampleGenerator();

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
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
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
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
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
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
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
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

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Plus UI MCP Server running on stdio');
  }
}

const server = new PlusUIMCPServer();
server.run().catch(console.error);