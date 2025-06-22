# CodePreview Component

A specialized code preview and playground component developed for Plus UI documentation.

## 🚀 Features

- ✅ **Auto Code Generation**: Generate code for 5 frameworks from a single HTML example
- ✅ **Variant System**: Automatic variants with `data-variant-*` attributes
- ✅ **Interactive Playground**: Real-time preview and controls
- ✅ **Multiple Components**: Multiple components in a single CodePreview
- ✅ **Smart Formatting**: Proper indentation and formatting
- ✅ **Framework Support**: React, Angular, Vue, Svelte, HTML

## 📖 Usage

### Basic Usage

```astro
<CodePreview>
  <plus-button>Click Me</plus-button>
</CodePreview>
```

### Variant System

```astro
<CodePreview horizontal>
  <plus-button data-variant-kind="filled,outlined,text">Button</plus-button>
</CodePreview>
```

### Interactive Playground

```astro
<CodePreview
  horizontal
  showPlayground
  controls="kind,size,status"
  controlValues={{
    size: ["sm", "md", "lg"],
    status: ["default", "primary", "success"]
  }}
>
  <plus-button kind="filled" size="md">Button</plus-button>
</CodePreview>
```

### Multiple Components

```astro
<CodePreview horizontal>
  <plus-button>
    <i class="fa-solid fa-download" slot="prefix"></i>
    Download
  </plus-button>
  <plus-button>
    Upload
    <i class="fa-solid fa-upload" slot="suffix"></i>
  </plus-button>
</CodePreview>
```

## 🔧 Props

| Prop              | Type                        | Default | Description                              |
| ----------------- | --------------------------- | ------- | ---------------------------------------- |
| `title`           | `string?`                   | -       | Preview title                            |
| `className`       | `string?`                   | -       | Additional CSS classes                   |
| `horizontal`      | `boolean`                   | `false` | Display components side by side          |
| `showPlayground`  | `boolean`                   | `false` | Enable interactive playground            |
| `showCodeSandbox` | `boolean`                   | `false` | Show CodeSandbox link                    |
| `controls`        | `string?`                   | -       | Playground controls ("kind,size,status") |
| `controlValues`   | `Record<string, string[]>?` | -       | Custom control values                    |

## 🛠 How It Works

### 1. Variant System

```astro
<!-- Input -->
<plus-button data-variant-kind="filled,outlined,text">Button</plus-button>

<!-- Output: 3 separate examples generated -->
<!-- <plus-button kind="filled">Button</plus-button> -->
<!-- <plus-button kind="outlined">Button</plus-button> -->
<!-- <plus-button kind="text">Button</plus-button> -->
```

### 2. Framework Conversion

#### React

```html
<!-- Input: HTML -->
<plus-button class="custom" full-width>Click</plus-button>

<!-- Output: React -->
<PlusButton className="custom" fullWidth>Click</PlusButton>
```

#### Angular/Vue/Svelte

Web components are used directly, no conversion needed.

### 3. Multiple Component Formatting

```astro
<!-- Input -->
<CodePreview>
  <plus-button>One</plus-button><plus-button>Two</plus-button>
</CodePreview>

<!-- Output: Each component on separate line -->
<PlusButton>One</PlusButton>
<PlusButton>Two</PlusButton>
```

## 🔄 Framework Output Examples

### React

```tsx
import { PlusButton } from "@plusui/react";

export default () => {
  return (
    <>
      <PlusButton kind="filled">Button</PlusButton>
    </>
  );
};
```

### Angular

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-example",
  template: ` <plus-button kind="filled">Button</plus-button> `,
})
export class ExampleComponent {}
```

### Vue

```vue
<template>
  <plus-button kind="filled">Button</plus-button>
</template>
```

### Svelte

```svelte
<plus-button kind="filled">Button</plus-button>
```

## 🎯 Playground System

### Auto Controls

```astro
<CodePreview showPlayground controls="kind,size">
  <plus-button kind="filled" size="md">Button</plus-button>
</CodePreview>
```

### Custom Control Values

```astro
<CodePreview
  showPlayground
  controls="size,status"
  controlValues={{
    size: ["sm", "md", "lg", "xl"],
    status: ["default", "primary", "danger"]
  }}
>
  <plus-button>Button</plus-button>
</CodePreview>
```

## 🚧 Future Improvements

- [ ] **Copy to Clipboard**: Copy code examples
- [ ] **CodeSandbox Integration**: Open directly in CodeSandbox
- [ ] **Real-time Code Updates**: Update code on playground changes
- [ ] **CSS Properties Playground**: Controls for CSS custom properties
- [ ] **Multiple Props Variants**: Multiple prop combinations
- [ ] **Custom Framework Slots**: Framework-specific code examples

## 📁 File Structure

```
src/component/plus-ui/codepreview/
├── CodePreview.astro        # Main component
├── README.md               # This documentation
└── ...                     # Other utility components
```

## 🔍 Debugging

### Console Logs

For detailed logs in development environment:

```javascript
// In browser console
localStorage.setItem("codepreview-debug", "true");
```
