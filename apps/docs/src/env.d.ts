/// <reference types="astro/client" />
/// <reference types="@astrojs/starlight/virtual" />

declare module "virtual:starlight/user-images" {
  export const logos: any;
}

declare module "virtual:starlight/user-config" {
  const config: any;
  export default config;
}

declare module "virtual:starlight/components/*" {
  const component: any; // You might want to use a more specific type like AstroComponent if available
  export default component;
}
