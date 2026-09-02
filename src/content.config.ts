import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts live as Markdown under src/content/blog. Static build, Shiki-highlighted
// code, no client runtime - same rules as the rest of the site. A post with
// `draft: true` is built by nobody: it is filtered out of the listing, the
// feed, the sitemap and getStaticPaths, so it has no URL at all.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
