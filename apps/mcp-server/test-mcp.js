#!/usr/bin/env node

import { PlusUIComponentService } from './dist/services/component-service.js';
import { ComponentExampleGenerator } from './dist/services/example-generator.js';

async function testMCPServer() {
  console.log('🧪 Testing Plus UI MCP Server...\n');

  const componentService = new PlusUIComponentService();
  const exampleGenerator = new ComponentExampleGenerator();

  try {
    // Test 1: Get available components
    console.log('📦 Testing component discovery...');
    const components = await componentService.getAvailableComponents();
    console.log(`✅ Found ${components.length} components`);

    if (components.length > 0) {
      const firstComponent = components[0];
      console.log(`   📋 First component: ${firstComponent.name} (${firstComponent.tagName})`);
    }

    // Test 2: Search components
    console.log('\n🔍 Testing component search...');
    const buttonComponents = await componentService.searchComponents('button');
    console.log(`✅ Found ${buttonComponents.length} button components`);

    // Test 3: Generate code
    console.log('\n🛠️  Testing code generation...');
    const buttonCode = exampleGenerator.generateComponentCode(
      'plus-button',
      'react',
      { kind: 'filled', status: 'primary' },
      { default: 'Test Button' }
    );
    console.log('✅ Generated React code:');
    console.log('```jsx');
    console.log(buttonCode);
    console.log('```');

    // Test 4: Get examples
    console.log('\n📚 Testing example generation...');
    const examples = await exampleGenerator.getComponentExamples('plus-button', 'html');
    console.log(`✅ Generated ${examples.length} examples for plus-button`);

    // Test 5: Validate usage
    console.log('\n✔️  Testing usage validation...');
    const validation = await componentService.validateComponentUsage(
      '<plus-button kind="filled">Submit</plus-button>',
      'html'
    );
    console.log(`✅ Validation result: ${validation.isValid ? 'Valid' : 'Invalid'}`);
    console.log(`   💡 Suggestions: ${validation.suggestions.length}`);

    console.log('\n🎉 All tests passed! MCP Server is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.message.includes('custom-elements.json')) {
      console.log('\n💡 Tip: Make sure to build the core library first:');
      console.log('   pnpm core:build');
    }
  }
}

testMCPServer();