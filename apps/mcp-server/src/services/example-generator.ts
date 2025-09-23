import { ComponentMetadata, ComponentExample } from './component-service.js';

export class ComponentExampleGenerator {

  generateComponentCode(
    componentName: string,
    framework: string,
    props: Record<string, any> = {},
    slots: Record<string, string> = {}
  ): string {
    const tagName = componentName.startsWith('plus-') ? componentName : `plus-${componentName}`;

    switch (framework) {
      case 'html':
        return this.generateHTMLCode(tagName, props, slots);
      case 'react':
        return this.generateReactCode(tagName, props, slots);
      case 'vue':
        return this.generateVueCode(tagName, props, slots);
      case 'svelte':
        return this.generateSvelteCode(tagName, props, slots);
      case 'angular':
        return this.generateAngularCode(tagName, props, slots);
      default:
        return this.generateHTMLCode(tagName, props, slots);
    }
  }

  private generateHTMLCode(
    tagName: string,
    props: Record<string, any>,
    slots: Record<string, string>
  ): string {
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : '';
        }
        return `${key}="${value}"`;
      })
      .filter(Boolean)
      .join(' ');

    const content = slots.default || 'Component Content';
    const prefixSlot = slots.prefix ? `<span slot="prefix">${slots.prefix}</span>` : '';
    const suffixSlot = slots.suffix ? `<span slot="suffix">${slots.suffix}</span>` : '';

    return `<${tagName}${propsString ? ' ' + propsString : ''}>
  ${prefixSlot}
  ${content}
  ${suffixSlot}
</${tagName}>`;
  }

  private generateReactCode(
    tagName: string,
    props: Record<string, any>,
    slots: Record<string, string>
  ): string {
    const componentName = this.toPascalCase(tagName.replace('plus-', ''));

    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : '';
        }
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join(' ');

    const content = slots.default || 'Component Content';
    const prefixSlot = slots.prefix ? `<span slot="prefix">${slots.prefix}</span>` : '';
    const suffixSlot = slots.suffix ? `<span slot="suffix">${slots.suffix}</span>` : '';

    return `import { ${componentName} } from '@plusui/library/react';

function MyComponent() {
  return (
    <${componentName}${propsString ? ' ' + propsString : ''}>
      ${prefixSlot}
      ${content}
      ${suffixSlot}
    </${componentName}>
  );
}`;
  }

  private generateVueCode(
    tagName: string,
    props: Record<string, any>,
    slots: Record<string, string>
  ): string {
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : '';
        }
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        return `:${key}="${JSON.stringify(value)}"`;
      })
      .filter(Boolean)
      .join(' ');

    const content = slots.default || 'Component Content';
    const prefixSlot = slots.prefix ? `\n    <template #prefix>${slots.prefix}</template>` : '';
    const suffixSlot = slots.suffix ? `\n    <template #suffix>${slots.suffix}</template>` : '';

    return `<template>
  <${tagName}${propsString ? ' ' + propsString : ''}>${prefixSlot}
    ${content}${suffixSlot}
  </${tagName}>
</template>

<script>
import '@plusui/library';

export default {
  name: 'MyComponent'
};
</script>`;
  }

  private generateSvelteCode(
    tagName: string,
    props: Record<string, any>,
    slots: Record<string, string>
  ): string {
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : '';
        }
        return `${key}="${value}"`;
      })
      .filter(Boolean)
      .join(' ');

    const content = slots.default || 'Component Content';
    const prefixSlot = slots.prefix ? `\n  <span slot="prefix">${slots.prefix}</span>` : '';
    const suffixSlot = slots.suffix ? `\n  <span slot="suffix">${slots.suffix}</span>` : '';

    return `<script>
  import '@plusui/library';
</script>

<${tagName}${propsString ? ' ' + propsString : ''}>${prefixSlot}
  ${content}${suffixSlot}
</${tagName}>`;
  }

  private generateAngularCode(
    tagName: string,
    props: Record<string, any>,
    slots: Record<string, string>
  ): string {
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? `[${key}]="true"` : '';
        }
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        return `[${key}]="${JSON.stringify(value)}"`;
      })
      .filter(Boolean)
      .join(' ');

    const content = slots.default || 'Component Content';
    const prefixSlot = slots.prefix ? `\n  <span slot="prefix">${slots.prefix}</span>` : '';
    const suffixSlot = slots.suffix ? `\n  <span slot="suffix">${slots.suffix}</span>` : '';

    return `<!-- component.html -->
<${tagName}${propsString ? ' ' + propsString : ''}>${prefixSlot}
  ${content}${suffixSlot}
</${tagName}>

<!-- app.module.ts -->
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }`;
  }

  async getComponentExamples(
    componentName: string,
    framework: string = 'html',
    useCase?: string
  ): Promise<ComponentExample[]> {
    const examples: ComponentExample[] = [];
    const tagName = componentName.startsWith('plus-') ? componentName : `plus-${componentName}`;

    // Get component-specific examples based on tag name
    switch (tagName) {
      case 'plus-button':
        examples.push(...await this.getButtonExamples(framework));
        break;
      case 'plus-modal':
        examples.push(...await this.getModalExamples(framework));
        break;
      case 'plus-input':
        examples.push(...await this.getInputExamples(framework));
        break;
      case 'plus-select':
        examples.push(...await this.getSelectExamples(framework));
        break;
      case 'plus-alert':
        examples.push(...await this.getAlertExamples(framework));
        break;
      default:
        examples.push(...await this.getGenericExamples(tagName, framework));
    }

    // Filter by use case if specified
    if (useCase) {
      return examples.filter(example =>
        example.title.toLowerCase().includes(useCase.toLowerCase()) ||
        example.description.toLowerCase().includes(useCase.toLowerCase())
      );
    }

    return examples;
  }

  private async getButtonExamples(framework: string): Promise<ComponentExample[]> {
    return [
      {
        title: 'Primary Button',
        description: 'Main action button with primary styling',
        code: this.generateComponentCode('plus-button', framework, { kind: 'filled', status: 'primary' }, { default: 'Click Me' }),
        framework
      },
      {
        title: 'Secondary Button',
        description: 'Secondary action with outlined style',
        code: this.generateComponentCode('plus-button', framework, { kind: 'outlined', status: 'default' }, { default: 'Cancel' }),
        framework
      },
      {
        title: 'Loading Button',
        description: 'Button with loading state',
        code: this.generateComponentCode('plus-button', framework, { kind: 'filled', status: 'primary', loading: true }, { default: 'Submitting...' }),
        framework
      },
      {
        title: 'Button with Icons',
        description: 'Button with prefix and suffix slots',
        code: this.generateComponentCode('plus-button', framework, { kind: 'filled' }, {
          prefix: '👤',
          default: 'Profile',
          suffix: '→'
        }),
        framework
      }
    ];
  }

  private async getModalExamples(framework: string): Promise<ComponentExample[]> {
    return [
      {
        title: 'Basic Modal',
        description: 'Simple modal dialog',
        code: this.generateComponentCode('plus-modal', framework, { open: true }, {
          default: '<h2>Modal Title</h2><p>Modal content goes here</p>'
        }),
        framework
      },
      {
        title: 'Confirmation Modal',
        description: 'Modal for user confirmations',
        code: this.generateComponentCode('plus-modal', framework, { open: true, size: 'sm' }, {
          default: '<h2>Confirm Action</h2><p>Are you sure you want to continue?</p><div><plus-button kind="outlined">Cancel</plus-button><plus-button status="danger">Delete</plus-button></div>'
        }),
        framework
      }
    ];
  }

  private async getInputExamples(framework: string): Promise<ComponentExample[]> {
    return [
      {
        title: 'Basic Input',
        description: 'Simple text input field',
        code: this.generateComponentCode('plus-input', framework, { placeholder: 'Enter your name' }),
        framework
      },
      {
        title: 'Email Input with Validation',
        description: 'Email input with built-in validation',
        code: this.generateComponentCode('plus-input', framework, {
          type: 'email',
          placeholder: 'your@email.com',
          required: true
        }),
        framework
      },
      {
        title: 'Input with Icon',
        description: 'Input field with prefix icon',
        code: this.generateComponentCode('plus-input', framework, { placeholder: 'Search...' }, {
          prefix: '🔍'
        }),
        framework
      }
    ];
  }

  private async getSelectExamples(framework: string): Promise<ComponentExample[]> {
    return [
      {
        title: 'Basic Select',
        description: 'Simple dropdown selection',
        code: this.generateComponentCode('plus-select', framework, { placeholder: 'Choose option' }, {
          default: '<plus-select-item value="1">Option 1</plus-select-item><plus-select-item value="2">Option 2</plus-select-item>'
        }),
        framework
      },
      {
        title: 'Multi-select',
        description: 'Multiple selection dropdown',
        code: this.generateComponentCode('plus-select', framework, { multiple: true, placeholder: 'Select multiple' }, {
          default: '<plus-select-item value="1">Option 1</plus-select-item><plus-select-item value="2">Option 2</plus-select-item><plus-select-item value="3">Option 3</plus-select-item>'
        }),
        framework
      }
    ];
  }

  private async getAlertExamples(framework: string): Promise<ComponentExample[]> {
    return [
      {
        title: 'Success Alert',
        description: 'Success message alert',
        code: this.generateComponentCode('plus-alert', framework, { status: 'success' }, {
          default: 'Operation completed successfully!'
        }),
        framework
      },
      {
        title: 'Error Alert',
        description: 'Error message with action',
        code: this.generateComponentCode('plus-alert', framework, { status: 'danger', closable: true }, {
          default: 'Something went wrong. Please try again.'
        }),
        framework
      }
    ];
  }

  private async getGenericExamples(tagName: string, framework: string): Promise<ComponentExample[]> {
    return [
      {
        title: 'Basic Usage',
        description: `Basic ${tagName} component`,
        code: this.generateComponentCode(tagName, framework, {}, { default: 'Content' }),
        framework
      }
    ];
  }

  private toPascalCase(str: string): string {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}