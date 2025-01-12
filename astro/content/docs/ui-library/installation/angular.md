---
title: Angular
description: 'Amplify Angular Development: Introducing Plus UI - Your Angular to Excellence'
---

## Angular Installation

1. In the directory where your Angular project is located, open the terminal or command prompt and install the Plus UI package by typing the following command:

```sh
npm install @plusui/core
```

2. Open the angular.json file, which is your Angular project file, and add the style file of Plus UI to the "styles" section. We will fetch this file from the node_modules directory.

```json
"styles":[
    "src/styles.css",
    "node_modules/@plusui/core/dist/style.css"
],
```

3. Open the app.module.ts file within your Angular project. Perform the necessary import operations and add the CUSTOM_ELEMENTS_SCHEMA in the schemas section.

```typescript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@plusui/core';
// Other imports...

@NgModule({
  declarations: [ 
    // Other declarations...
  ],
  imports: [
    // Other imports...
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // needed to support custom elements
  // Other module metadata...
})
export class AppModule { }
```

4. Open an Angular component file within your project and add an example using the Plus UI component.

```html
<plus-button status="primary">Primary Button</plus-button>
```

## **Get help**

Plus UI is more than a library; it’s a community. Engage with fellow developers, share your Plus UI projects, and contribute to the library’s growth. Your insights, feedback, and contributions drive the evolution of Plus UI:


### Community Links
- **Discord Community** - [Join our Discord](https://discord.com/invite/Y5a78GGX)
- **Figma Community** - [Follow us on Figma](https://www.figma.com/@PLUSUI)
- **Twitter** - [Follow us on Twitter](https://twitter.com/PlusUI_Official)

