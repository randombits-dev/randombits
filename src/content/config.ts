// Import utilities from `astro:content`
import {defineCollection, z} from 'astro:content';
// Define a schema for each collection you'd like to validate.
const articles = defineCollection({
  schema: ({image}) => z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    updated: z.date().optional(),
    summary: z.string().optional(),
    desc: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    hide: z.boolean().optional(),
    img: image().refine(() => true).optional(),
    order: z.number().optional()
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  articles: articles,
  'standard-notes': articles,
  'number-localization': articles,
  'stable-diffusion': articles,
};
