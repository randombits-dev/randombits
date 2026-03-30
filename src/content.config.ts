// Import utilities from `astro:content`
import {defineCollection} from 'astro:content';
import {z} from 'astro/zod';
import {glob} from 'astro/loaders';

const articles = (folder: string) => defineCollection({
  loader: glob({base: `./src/content/${folder}`, pattern: '**/*.{md,mdx}'}),
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
    order: z.number().optional(),
    feature: z.boolean().default(true)
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  articles: articles('articles'),
  'standard-notes': articles('standard-notes'),
  'number-localization': articles('number-localization'),
  'stable-diffusion': articles('stable-diffusion'),
};
