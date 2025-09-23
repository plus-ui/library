#!/usr/bin/env node

// Direct MCP client test to verify components are working
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';

async function testMCPConnection() {
  console.log('🔗 Testing direct MCP connection...\n');

  try {
    // Spawn MCP server process
    const serverProcess = spawn('node', [
      '/Users/muratpolatozkan/works/plus/library/apps/mcp-server/dist/index.js'
    ], {
      env: {
        ...process.env,
        LIBRARY_PATH: '/Users/muratpolatozkan/works/plus/library'
      }
    });

    // Create MCP client
    const transport = new StdioClientTransport({
      command: 'node',
      args: ['/Users/muratpolatozkan/works/plus/library/apps/mcp-server/dist/index.js'],
      env: {
        LIBRARY_PATH: '/Users/muratpolatozkan/works/plus/library'
      }
    });

    const client = new Client(
      {
        name: 'test-client',
        version: '1.0.0',
      },
      {
        capabilities: {},
      }
    );

    await client.connect(transport);
    console.log('✅ Connected to MCP server');

    // List resources
    const resources = await client.listResources();
    console.log(`📦 Found ${resources.resources.length} resources:`);

    for (const resource of resources.resources.slice(0, 5)) {
      console.log(`   • ${resource.name} (${resource.uri})`);
    }

    // List tools
    const tools = await client.listTools();
    console.log(`\n🛠️  Found ${tools.tools.length} tools:`);

    for (const tool of tools.tools) {
      console.log(`   • ${tool.name}: ${tool.description}`);
    }

    // Test search components tool
    console.log('\n🔍 Testing search_components tool...');
    const searchResult = await client.callTool({
      name: 'search_components',
      arguments: { query: 'avatar' }
    });

    console.log('Search result:', searchResult.content[0].text);

    await client.close();
    serverProcess.kill();

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testMCPConnection();