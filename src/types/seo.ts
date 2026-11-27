import { z } from "zod"

/**
 * Optional per-page SEO overrides, editable in Admin (proposal §3.2, §3.4, §4.1).
 * Only entities that have their own public URL carry this. Both fields are
 * optional: when empty, the page falls back to the entity's name/description.
 * The share image (OG) comes from the entity's main image, not a separate field.
 */
export const seoFieldsSchema = z.object({
  title: z.string().trim().max(70, "Tối đa 70 ký tự").optional(),
  description: z.string().trim().max(160, "Tối đa 160 ký tự").optional(),
})
export type SeoFields = z.infer<typeof seoFieldsSchema>

/** A named page path, used for breadcrumbs and ItemList JSON-LD. */
export type PageLink = { name: string; path: string }
