// Import utilities from `astro:content`
import {defineCollection, z} from "astro:content";
// Define a schema for each collection you'd like to validate.
const articleCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        published: z.date(),
        updated: z.date().optional(),
        summary: z.string(),
        desc: z.string().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional(),
        hide: z.boolean().optional(),
        img: z.string().optional()
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
    articles: articleCollection,
};