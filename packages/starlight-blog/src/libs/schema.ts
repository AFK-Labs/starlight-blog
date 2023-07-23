import { docsSchema } from '@astrojs/starlight/schema'
import { z } from 'astro/zod'

export const blogAuthorSchema = z.object({
  // TODO(HiDeoo)
  name: z.string().min(1),
  // TODO(HiDeoo)
  picture: z.string().optional(),
  // TODO(HiDeoo)
  url: z.string().url().optional(),
})

export const blogEntrySchema = z.object({
  // TODO(HiDeoo) comment
  authors: z.union([z.string(), blogAuthorSchema, z.array(z.union([z.string(), blogAuthorSchema]))]).optional(),
  // TODO(HiDeoo) comment
  date: z.date(),
  // TODO(HiDeoo) comment
  excerpt: z.string().optional(),
  // TODO(HiDeoo) comment
  tags: z.string().array().optional(),
})

export function docsAndBlogSchema(context: SchemaContext) {
  return docsSchema()(context).merge(blogEntrySchema.partial())
}

export type StarlightBlogAuthor = z.infer<typeof blogAuthorSchema>

type SchemaContext = Parameters<ReturnType<typeof docsSchema>>[0]
