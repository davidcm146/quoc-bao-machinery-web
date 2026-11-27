import { z } from "zod"

import { faqItemSchema, idSchema, timestampsSchema } from "@/types/common"
import { seoFieldsSchema } from "@/types/seo"

/*
 * Fixed pages whose text is edited in Admin (proposal §3.3, §3.5).
 * The route is fixed in code, so pages are identified by `key`, not a slug.
 */

export const contentPageKeySchema = z.enum([
  "about", // /gioi-thieu
  "contact", // /lien-he
  "rental-service", // /cho-thue-may – process, conditions
  "warranty-policy", // /chinh-sach-bao-hanh
  "privacy-policy", // /chinh-sach-bao-mat
])
export type ContentPageKey = z.infer<typeof contentPageKeySchema>

export const contentPageSchema = z.object({
  id: idSchema,
  key: contentPageKeySchema,
  title: z.string().trim().min(1),
  /** Rich text HTML. */
  content: z.string(),
  faqs: z.array(faqItemSchema).default([]),
  seo: seoFieldsSchema,
  ...timestampsSchema.shape,
})
export type ContentPage = z.infer<typeof contentPageSchema>

export const contentPageInputSchema = contentPageSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  key: true,
})
export type ContentPageInput = z.infer<typeof contentPageInputSchema>
