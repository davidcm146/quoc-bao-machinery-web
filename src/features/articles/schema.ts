import { z } from "zod"

import { idSchema, imageSchema, serverManagedKeys, slugSchema, timestampsSchema } from "@/types/common"
import { seoFieldsSchema } from "@/types/seo"

/* Knowledge / news articles (proposal §2.6, §3.4) */

/** Topic used to group articles. No public page of its own, so no SEO fields. */
export const articleTopicSchema = z.object({
  id: idSchema,
  slug: slugSchema,
  name: z.string().trim().min(1),
  sortOrder: z.number().int().default(0),
})
export type ArticleTopic = z.infer<typeof articleTopicSchema>

/** draft = "Lưu nháp", published = "Xuất bản", hidden = "Ẩn". */
export const articleStatusSchema = z.enum(["draft", "published", "hidden"])
export type ArticleStatus = z.infer<typeof articleStatusSchema>

export const articleSchema = z.object({
  id: idSchema,
  slug: slugSchema,
  title: z.string().trim().min(1),
  excerpt: z.string().trim(),
  coverImage: imageSchema.optional(),
  /** Rich text HTML; H2/H3 headings feed the table of contents. */
  content: z.string(),
  topicId: idSchema.nullable(),
  authorName: z.string().trim().min(1),
  status: articleStatusSchema,
  /** Set when first published; `updatedAt` is shown as "Cập nhật". */
  publishedAt: z.date().nullable(),
  featured: z.boolean().default(false),
  /** "Sản phẩm liên quan" block inside the article. */
  relatedProductIds: z.array(idSchema).default([]),
  seo: seoFieldsSchema,
  ...timestampsSchema.shape,
})
export type Article = z.infer<typeof articleSchema>

export const articleInputSchema = articleSchema.omit(serverManagedKeys)
export type ArticleInput = z.infer<typeof articleInputSchema>

/** Article as shown in lists ("Tin tức & kiến thức", related posts). */
export type ArticleSummary = Pick<Article, "slug" | "title" | "excerpt" | "publishedAt">
