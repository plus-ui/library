import { CodeBubble } from "code-bubble";
import packageJson from "../../../../../packages/core/package.json";

(async () => {
  async function fetchLibData(url) {
    const baseUrl = window.location.href.includes("localhost")
      ? ""
      : window.location.href.split("/iframe")[0];

    try {
      const response = await fetch(baseUrl + url); // Make the request
      return await response.text(); // Extract JSON data
    } catch (error) {
      console.error("Error fetching data:", url, error);
      return null; // Handle the error gracefully
    }
  }

  /** @type { import('code-bubble').CodeBubbleConfig } */
  new CodeBubble({
    sandbox: "stackblitz",
    component: {
      rtlButton: {
        hide: true,
      },
      copyCodeButton: {
        hide: true,
      },
      frameworkButtons: {
        label: (framework) =>
          ({
            html: "HTML",
            tsx: "React",
            ts: "Angular",
            vue: "Vue",
            svelte: "Svelte",
          }[framework] || framework),
      },
    },
    sandboxConfig: {
      /** StackBlitz sandbox configuration */
      stackBlitz: {
        html: {
          project: {
            title: packageJson.name + " Demo",
            description: "A live web component demo",
            files: {
              [`libs/${packageJson.name}/index.js`]: await fetchLibData(
                "/html/index.js"
              ),
            },
          },
          exampleTemplate: {
            fileName: "index.html",
            template: `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>${packageJson.name} Demo</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <script type="module" src="libs/${packageJson.name}/index.js"></script>
  </head>

  <body>
    %example%
  </body>
</html>`,
          },
        },
        tsx: {
          project: {
            title: packageJson.name + " React Demo",
            description: "A live react/web component demo",
            files: {
              [`libs/${packageJson.name}/react/index.js`]: await fetchLibData(
                "/react/index.js"
              ),
              [`libs/${packageJson.name}/react/index.d.ts`]: await fetchLibData(
                "/react/index.d.ts"
              ),
              "src/index.tsx": `import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);`,
              [`libs/${packageJson.name}/package.json`]: `{
  "name": "${packageJson.name}",
  "version": "${packageJson.version}",
  "description": "A live react/web component demo",
  "main": "index.js"
}`,
              "package.json": `{
  "name": "react-sandbox",
  "version": "1.0.0",
  "main": "src/index.tsx",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "${packageJson.name}": "file:./libs/${packageJson.name}"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.15.0",
    "@typescript-eslint/parser": "^7.15.0",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "typescript": "^5.2.2",
    "vite": "^5.3.2"
  }
}`,
              "tsconfig.json": `{
  "include": ["./src/**/*"],
  "compilerOptions": {
    "strict": false,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "baseUrl": "."
  }
}`,
              "vite.config.ts": `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});`,
              "index.html": `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React code example</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>`,
            },
          },
          exampleTemplate: {
            fileName: "src/App.tsx",
            template: `%example%`,
          },
        },
        ts: {
          project: {
            title: packageJson.name + " Angular Demo",
            description: "A live angular/web component demo",
            files: {
              [`libs/${packageJson.name}/index.js`]: await fetchLibData(
                "/html/index.js"
              ),
              "src/main.ts": `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));`,
              "src/app/app.module.ts": `import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import '@plusui/library';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`,
              "package.json": `{
  "name": "angular-sandbox",
  "version": "0.0.0", 
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build"
  },
  "dependencies": {
    "@angular/animations": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/compiler": "^17.0.0", 
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/platform-browser": "^17.0.0",
    "@angular/platform-browser-dynamic": "^17.0.0",
    "@angular/router": "^17.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.2",
    "${packageJson.name}": "file:./libs/${packageJson.name}"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.0.0",
    "@angular/cli": "^17.0.0",
    "@angular/compiler-cli": "^17.0.0",
    "typescript": "~5.2.2"
  }
}`,
              "tsconfig.json": `{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom"]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}`,
              "angular.json": `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "angular-sandbox": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.json",
            "assets": ["src/favicon.ico", "src/assets"],
            "scripts": []
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "angular-sandbox:build"
          }
        }
      }
    }
  }
}`,
              "src/index.html": `<!DOCTYPE html>
<html>
  <head>
    <title>Angular Demo</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <script type="module" src="libs/${packageJson.name}/index.js"></script>
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>`,
            },
          },
          exampleTemplate: {
            fileName: "src/app/app.component.ts",
            template: `%example%`,
          },
        },
        vue: {
          project: {
            title: packageJson.name + " Vue Demo",
            description: "A live vue/web component demo",
            files: {
              [`libs/${packageJson.name}/index.js`]: await fetchLibData(
                "/html/index.js"
              ),
              "src/main.js": `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')`,
              "package.json": `{
  "name": "vue-sandbox",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "${packageJson.name}": "file:./libs/${packageJson.name}"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0"
  }
}`,
              "vite.config.js": `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('plus-')
        }
      }
    })
  ]
})`,
              "index.html": `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue Example</title>
    <script type="module" src="libs/${packageJson.name}/index.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`,
            },
          },
          exampleTemplate: {
            fileName: "src/App.vue",
            template: `%example%`,
          },
        },
        svelte: {
          project: {
            title: packageJson.name + " Svelte Demo",
            description: "A live svelte/web component demo",
            files: {
              [`libs/${packageJson.name}/index.js`]: await fetchLibData(
                "/html/index.js"
              ),
              "src/main.js": `import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app`,
              "package.json": `{
  "name": "svelte-sandbox",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^3.0.0",
    "svelte": "^4.2.0",
    "vite": "^5.0.0"
  },
  "dependencies": {
    "${packageJson.name}": "file:./libs/${packageJson.name}"
  }
}`,
              "vite.config.js": `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()]
})`,
              "index.html": `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Svelte Example</title>
    <script type="module" src="libs/${packageJson.name}/index.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`,
            },
          },
          exampleTemplate: {
            fileName: "src/App.svelte",
            template: `%example%`,
          },
        },
      },
    },
  });
})();
