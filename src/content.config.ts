import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const doodleNames = ['plant', 'cup', 'plane', 'sparkle', 'bulb', 'tennis', 'bird', 'slots'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    year: z.number(),
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        github: z.string().url().optional(),
        live: z.string().url().optional(),
        report: z.string().optional(), // e.g. /projects/my-thing/report.pdf
        paper: z.string().url().optional(),
      })
      .default({}),
    // Path under /public, e.g. /projects/my-thing/demo.mp4 (a demo.webm next to it is picked up automatically)
    video: z.string().optional(),
    // Shape of the window, as width / height of the video. Defaults to 16 / 10.
    // A tall phone/game recording might be "718 / 1212"; the window shrinks to fit.
    aspect: z
      .string()
      .regex(/^\s*\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?\s*$/, 'use "width / height", e.g. "16 / 9"')
      .optional(),
    // A still image shown in the window when there's no video (e.g. a results chart)
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // Defaults to poster.jpg next to the video if it exists
    poster: z.string().optional(),
    // Optional longer walkthrough (unlisted YouTube works well)
    youtube: z.string().url().optional(),
    doodle: z.enum(doodleNames).default('sparkle'),
    // A short handwritten aside shown next to the project
    note: z.string().optional(),
    order: z.number().default(0),
    // Shows a "sample" tag so placeholder projects can't sneak into production unnoticed
    placeholder: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
