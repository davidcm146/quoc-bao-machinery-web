import { z } from "zod"

import {
  idSchema,
  imageSchema,
  serverManagedKeys,
  slugSchema,
  timestampsSchema,
  visibilitySchema,
} from "@/types/common"
import type { ProductCategory } from "@/features/products/schema"
import { seoFieldsSchema } from "@/types/seo"

/* Completed projects – list + detail pages (proposal §2.7, §3.5) */

export const projectSchema = z.object({
  id: idSchema,
  slug: slugSchema,
  name: z.string().trim().min(1),
  location: z.string().trim().min(1),
  /** "Loại máy" – links the project to a product category. */
  categoryId: idSchema.nullable(),
  summary: z.string().trim(),
  /** Scope / solution, rich text HTML. */
  description: z.string(),
  images: z.array(imageSchema).min(1, "Cần ít nhất 1 ảnh dự án"),
  featured: z.boolean().default(false), // homepage "Dự án tiêu biểu"
  sortOrder: z.number().int().default(0),
  visibility: visibilitySchema,
  seo: seoFieldsSchema,
  ...timestampsSchema.shape,
})
export type Project = z.infer<typeof projectSchema>

export const projectInputSchema = projectSchema.omit(serverManagedKeys)
export type ProjectInput = z.infer<typeof projectInputSchema>

/** Project as shown on cards. `categoryName` is joined from the project's category. */
export type ProjectSummary = Pick<Project, "slug" | "name" | "location"> & {
  categoryName: ProductCategory["name"] | null
}
