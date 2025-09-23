#!/usr/bin/env node

import { ComponentExampleGenerator } from './dist/services/example-generator.js';
import { PlusUIComponentService } from './dist/services/component-service.js';

async function testAvatar() {
  console.log('🧑‍💻 Testing Avatar component via MCP...\n');

  const componentService = new PlusUIComponentService();
  const exampleGenerator = new ComponentExampleGenerator();

  try {
    // Get Avatar component details
    console.log('📋 Getting Avatar component details...');
    const avatar = await componentService.getComponentDetails('plus-avatar');

    if (avatar) {
      console.log(`✅ Found: ${avatar.name} (${avatar.tagName})`);
      console.log(`📝 Description: ${avatar.description}`);
      console.log(`🏷️  Category: ${avatar.category}`);

      // Show properties
      if (avatar.properties && avatar.properties.length > 0) {
        console.log('\n⚙️ Properties:');
        avatar.properties.slice(0, 3).forEach(prop => {
          console.log(`   • ${prop.name} (${prop.type}): ${prop.description}`);
        });
      }

      // Generate HTML example
      console.log('\n🔧 Generating HTML example...');
      const htmlCode = await exampleGenerator.generateComponentCode(
        'plus-avatar',
        'html',
        { src: 'https://avatar.iran.liara.run/public/42', size: 'medium' },
        {}
      );
      console.log('✅ HTML Code:');
      console.log('```html');
      console.log(htmlCode);
      console.log('```');

      // Generate React example
      console.log('\n⚛️ Generating React example...');
      const reactCode = await exampleGenerator.generateComponentCode(
        'plus-avatar',
        'react',
        { src: 'https://avatar.iran.liara.run/public/42', size: 'large', shape: 'circle' },
        {}
      );
      console.log('✅ React Code:');
      console.log('```jsx');
      console.log(reactCode);
      console.log('```');

      // Get predefined examples
      console.log('\n📚 Getting predefined examples...');
      const examples = await exampleGenerator.getComponentExamples('plus-avatar', 'html');
      console.log(`✅ Found ${examples.length} examples:`);
      examples.slice(0, 2).forEach((example, i) => {
        console.log(`\n${i + 1}. ${example.title}`);
        console.log(`   ${example.description}`);
        console.log(`   Code: ${example.code.substring(0, 80)}...`);
      });

    } else {
      console.log('❌ Avatar component not found');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAvatar();