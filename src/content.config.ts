import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/blog/' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string(),
  }),
})

export const collections = { blog }
