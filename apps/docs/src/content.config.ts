import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        isComponent: z.boolean().optional(),
        description: z.string().optional(),
        version: z.string().optional(),
        since: z.string().optional(),
        updated: z.date().optional(),
      }),
    }),
  }),
};
