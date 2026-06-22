import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    lang: z.enum(['de', 'en']),
    year: z.number(),
    type: z.enum(['talk', 'workshop']),
    event: z.string(),
    title: z.string(),
    description: z.string(),
    coInstructor: z.string().optional(),
    url: z.string().url().optional(),
    placeholder: z.boolean().optional().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    lang: z.enum(['de', 'en']),
    title: z.string(),
    description: z.string(),
    source: z.string(),
    date: z.string().optional(),
    url: z.string().url().optional(),
    placeholder: z.boolean().optional().default(false),
  }),
});

export const collections = { talks, writing };
