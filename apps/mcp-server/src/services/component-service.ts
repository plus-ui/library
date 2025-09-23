import { promises as fs } from 'fs';
import path from 'path';

export interface ComponentMetadata {
  name: string;
  tagName: string;
  description: string;
  category: string;
  properties: ComponentProperty[];
  slots: ComponentSlot[];
  events: ComponentEvent[];
  methods: ComponentMethod[];
  cssProperties: CSSProperty[];
  examples: ComponentExample[];
}

export interface ComponentProperty {
  name: string;
  type: string;
  description: string;
  default?: string;
  required: boolean;
  values?: string[];
}

export interface ComponentSlot {
  name: string;
  description: string;
}

export interface ComponentEvent {
  name: string;
  description: string;
  detail?: any;
}

export interface ComponentMethod {
  name: string;
  description: string;
  parameters: any[];
  returnType: string;
}

export interface CSSProperty {
  name: string;
  description: string;
  default?: string;
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
  framework: string;
}

export class PlusUIComponentService {
  private componentsCache: ComponentMetadata[] | null = null;
  private libraryPath: string;

  constructor(libraryPath?: string) {
    // Default to Plus UI library path relative to this MCP server (now in apps/mcp-server)
    this.libraryPath = libraryPath || path.resolve('../../');
  }

  async getAvailableComponents(): Promise<ComponentMetadata[]> {
    if (this.componentsCache) {
      return this.componentsCache;
    }

    try {
      // Read custom-elements.json from Plus UI library
      const manifestPath = path.join(this.libraryPath, 'packages/core/custom-elements.json');
      const manifestContent = await fs.readFile(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);

      // Extract component metadata
      const components = await this.extractComponentsFromManifest(manifest);

      // Enrich with additional metadata
      for (const component of components) {
        await this.enrichComponentMetadata(component);
      }

      this.componentsCache = components;
      return components;
    } catch (error) {
      console.error('Failed to load component metadata:', error);
      return this.getFallbackComponents();
    }
  }

  private async extractComponentsFromManifest(manifest: any): Promise<ComponentMetadata[]> {
    const components: ComponentMetadata[] = [];

    for (const module of manifest.modules || []) {
      for (const declaration of module.declarations || []) {
        if (declaration.customElement && declaration.tagName) {
          const component: ComponentMetadata = {
            name: this.formatComponentName(declaration.name),
            tagName: declaration.tagName,
            description: declaration.description || '',
            category: this.categorizeComponent(declaration.tagName),
            properties: this.extractProperties(declaration),
            slots: this.extractSlots(declaration),
            events: this.extractEvents(declaration),
            methods: this.extractMethods(declaration),
            cssProperties: this.extractCSSProperties(declaration),
            examples: []
          };

          components.push(component);
        }
      }
    }

    return components;
  }

  private extractProperties(declaration: any): ComponentProperty[] {
    const properties: ComponentProperty[] = [];

    for (const member of declaration.members || []) {
      if (member.kind === 'field' && member.attribute) {
        properties.push({
          name: member.name,
          type: member.type?.text || 'string',
          description: member.description || '',
          default: member.default,
          required: !member.optional,
          values: this.extractEnumValues(member.type)
        });
      }
    }

    return properties;
  }

  private extractSlots(declaration: any): ComponentSlot[] {
    const slots: ComponentSlot[] = [];

    // Extract from JSDoc comments
    if (declaration.jsDoc) {
      const slotTags = declaration.jsDoc.filter((tag: any) => tag.name === 'slot');
      for (const slot of slotTags) {
        slots.push({
          name: slot.name || 'default',
          description: slot.description || ''
        });
      }
    }

    return slots;
  }

  private extractEvents(declaration: any): ComponentEvent[] {
    const events: ComponentEvent[] = [];

    for (const member of declaration.members || []) {
      if (member.kind === 'method' && member.name.startsWith('emit')) {
        // Extract custom events from emit calls
        events.push({
          name: member.name.replace('emit', '').toLowerCase(),
          description: member.description || ''
        });
      }
    }

    return events;
  }

  private extractMethods(declaration: any): ComponentMethod[] {
    const methods: ComponentMethod[] = [];

    for (const member of declaration.members || []) {
      if (member.kind === 'method' && member.privacy === 'public') {
        methods.push({
          name: member.name,
          description: member.description || '',
          parameters: member.parameters || [],
          returnType: member.return?.type?.text || 'void'
        });
      }
    }

    return methods;
  }

  private extractCSSProperties(declaration: any): CSSProperty[] {
    const cssProperties: CSSProperty[] = [];

    // Extract from JSDoc @cssproperty tags
    if (declaration.jsDoc) {
      const cssPropTags = declaration.jsDoc.filter((tag: any) => tag.name === 'cssproperty');
      for (const prop of cssPropTags) {
        cssProperties.push({
          name: prop.name,
          description: prop.description || '',
          default: prop.default
        });
      }
    }

    return cssProperties;
  }

  private extractEnumValues(type: any): string[] | undefined {
    if (type?.text && type.text.includes('|')) {
      return type.text.split('|').map((value: string) => value.trim().replace(/['"]/g, ''));
    }
    return undefined;
  }

  private formatComponentName(name: string): string {
    return name.replace(/([A-Z])/g, ' $1').trim().replace(/^Plus /, '');
  }

  private categorizeComponent(tagName: string): string {
    const categoryMap: { [key: string]: string } = {
      'button': 'action',
      'link': 'action',
      'input': 'input',
      'textarea': 'input',
      'select': 'input',
      'checkbox': 'input',
      'radio': 'input',
      'toggle': 'input',
      'rating': 'input',
      'modal': 'feedback',
      'drawer': 'feedback',
      'alert': 'feedback',
      'toast': 'feedback',
      'popover': 'feedback',
      'tooltip': 'feedback',
      'avatar': 'display',
      'badge': 'display',
      'chip': 'display',
      'icon': 'display',
      'text': 'display',
      'divider': 'layout',
      'accordion': 'layout',
      'tab': 'navigation',
      'breadcrumb': 'navigation',
      'dropdown': 'navigation'
    };

    for (const [key, category] of Object.entries(categoryMap)) {
      if (tagName.includes(key)) {
        return category;
      }
    }

    return 'other';
  }

  private async enrichComponentMetadata(component: ComponentMetadata): Promise<void> {
    // Add common examples based on component type
    component.examples = await this.generateDefaultExamples(component);
  }

  private async generateDefaultExamples(component: ComponentMetadata): Promise<ComponentExample[]> {
    const examples: ComponentExample[] = [];

    // Basic usage example
    examples.push({
      title: 'Basic Usage',
      description: `Simple ${component.name} component`,
      code: `<${component.tagName}>Default content</${component.tagName}>`,
      framework: 'html'
    });

    // Example with common props
    if (component.properties.length > 0) {
      const commonProps = component.properties.slice(0, 3);
      const propsString = commonProps
        .map(prop => `${prop.name}="${prop.default || 'value'}"`)
        .join(' ');

      examples.push({
        title: 'With Properties',
        description: `${component.name} with common properties`,
        code: `<${component.tagName} ${propsString}>Content</${component.tagName}>`,
        framework: 'html'
      });
    }

    return examples;
  }

  async getComponentDetails(componentName: string): Promise<ComponentMetadata | null> {
    const components = await this.getAvailableComponents();
    return components.find(c =>
      c.tagName === componentName ||
      c.name.toLowerCase() === componentName.toLowerCase()
    ) || null;
  }

  async searchComponents(query: string, category?: string): Promise<ComponentMetadata[]> {
    const components = await this.getAvailableComponents();
    const lowerQuery = query.toLowerCase();

    return components.filter(component => {
      const matchesQuery =
        component.name.toLowerCase().includes(lowerQuery) ||
        component.tagName.toLowerCase().includes(lowerQuery) ||
        component.description.toLowerCase().includes(lowerQuery) ||
        component.properties.some(prop => prop.name.toLowerCase().includes(lowerQuery));

      const matchesCategory = !category || component.category === category;

      return matchesQuery && matchesCategory;
    });
  }

  async validateComponentUsage(code: string, framework: string): Promise<{
    isValid: boolean;
    suggestions: string[];
  }> {
    const suggestions: string[] = [];
    const components = await this.getAvailableComponents();

    // Extract component usage from code
    const componentMatches = code.match(/<(plus-[\w-]+)/g) || [];

    for (const match of componentMatches) {
      const tagName = match.replace('<', '');
      const component = components.find(c => c.tagName === tagName);

      if (!component) {
        suggestions.push(`❌ Component '${tagName}' not found in Plus UI library`);
        continue;
      }

      // Check for required properties
      const requiredProps = component.properties.filter(p => p.required);
      for (const prop of requiredProps) {
        if (!code.includes(prop.name)) {
          suggestions.push(`⚠️  Missing required property '${prop.name}' for ${tagName}`);
        }
      }

      // Check for accessibility
      if (component.category === 'input' && !code.includes('aria-label') && !code.includes('label')) {
        suggestions.push(`♿ Consider adding aria-label or associating with a label for ${tagName}`);
      }
    }

    if (suggestions.length === 0) {
      suggestions.push('✅ No issues found. Code looks good!');
    }

    return {
      isValid: suggestions.every(s => !s.startsWith('❌')),
      suggestions
    };
  }

  async getGlobalStyles(): Promise<string> {
    try {
      const stylesPath = path.join(this.libraryPath, 'packages/core/src/styles/global.css');
      return await fs.readFile(stylesPath, 'utf-8');
    } catch (error) {
      return '/* Plus UI global styles not found */';
    }
  }

  private getFallbackComponents(): ComponentMetadata[] {
    // Fallback data if custom-elements.json is not available
    return [
      {
        name: 'Button',
        tagName: 'plus-button',
        description: 'Versatile button component with multiple variants',
        category: 'action',
        properties: [
          {
            name: 'kind',
            type: 'string',
            description: 'Button variant',
            default: 'filled',
            required: false,
            values: ['filled', 'outlined', 'dashed', 'text']
          },
          {
            name: 'status',
            type: 'string',
            description: 'Button status color',
            default: 'default',
            required: false,
            values: ['default', 'primary', 'success', 'warning', 'danger', 'info']
          }
        ],
        slots: [{ name: 'default', description: 'Button content' }],
        events: [{ name: 'plus-click', description: 'Fired when button is clicked' }],
        methods: [],
        cssProperties: [],
        examples: []
      }
    ];
  }
}