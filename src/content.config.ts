import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

/** Internal cross-links to a related talk/writing entry (site-relative anchor links). */
const related = z
  .array(
    z.object({
      href: z.string(),
      label: z.string(),
    }),
  )
  .optional();

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    lang: z.enum(['de', 'en']),
    year: z.number(),
    type: z.enum(['talk', 'workshop', 'webinar']),
    event: z.string(),
    /** True when the event is delivered online rather than in person. */
    online: z.boolean().optional().default(false),
    title: z.string(),
    description: z.string(),
    coInstructor: z.string().optional(),
    coInstructorUrl: z.string().url().optional(),
    url: z.string().url().optional(),
    placeholder: z.boolean().optional().default(false),
    /** ISO-8601 date/datetime, set when the talk content reveals a real date. */
    startDate: z.string().optional(),
    /** ISO-8601 date/datetime, set when the talk content reveals a real date. */
    endDate: z.string().optional(),
    related,
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
    related,
  }),
});

export const collections = { talks, writing };
