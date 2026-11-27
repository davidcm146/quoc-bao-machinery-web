import { z } from "zod"

import {
  faqItemSchema,
  idSchema,
  imageSchema,
  serverManagedKeys,
  slugSchema,
  timestampsSchema,
  visibilitySchema,
} from "@/types/common"
import { seoFieldsSchema } from "@/types/seo"

/* ------------------------------------------------------------------ */
/* Category (proposal §2.3, §3.2)                                      */
/* ------------------------------------------------------------------ */

/** A filter shown on the category page, e.g. "Diện tích lọc" → "Dưới 20 m²". */
export const categoryFilterSchema = z.object({
  key: slugSchema, // e.g. "dien-tich-loc"
  label: z.string().trim().min(1),
  options: z.array(z.object({ value: slugSchema, label: z.string().trim().min(1) })).min(1),
})
export type CategoryFilter = z.infer<typeof categoryFilterSchema>

export const productCategorySchema = z.object({
  id: idSchema,
  slug: slugSchema,
  name: z.string().trim().min(1),
  /** Short line for menus and cards. */
  description: z.string().trim(),
  /** 2–3 sentence intro under the H1 on the category page. */
  intro: z.string().trim(),
  /** Long-form content block ("… là gì?"), rich text HTML. */
  content: z.string(),
  image: imageSchema.optional(),
  faqs: z.array(faqItemSchema).default([]),
  filters: z.array(categoryFilterSchema).default([]),
  sortOrder: z.number().int().default(0),
  visibility: visibilitySchema,
  seo: seoFieldsSchema,
  ...timestampsSchema.shape,
})
export type ProductCategory = z.infer<typeof productCategorySchema>

export const productCategoryInputSchema = productCategorySchema.omit(serverManagedKeys)
export type ProductCategoryInput = z.infer<typeof productCategoryInputSchema>

/* ------------------------------------------------------------------ */
/* Rental info – a product is rentable when `rental` is set (§2.5, §3.3) */
/* ------------------------------------------------------------------ */

export const rentalStatusSchema = z.enum(["available", "rented", "maintenance"])
export type RentalStatus = z.infer<typeof rentalStatusSchema>

export const rentalInfoSchema = z.object({
  status: rentalStatusSchema,
  /** Free text as provided by the business, e.g. "Tối thiểu 1 tháng". */
  minimumPeriod: z.string().trim().optional(),
  depositTerms: z.string().trim().optional(),
  deliveryScope: z.string().trim().optional(),
  /** Shown instead of a price, e.g. "Giá thuê theo tháng – liên hệ". */
  priceNote: z.string().trim().optional(),
})
export type RentalInfo = z.infer<typeof rentalInfoSchema>

/* ------------------------------------------------------------------ */
/* Product (proposal §2.4, §3.2)                                       */
/* ------------------------------------------------------------------ */

export const stockStatusSchema = z.enum(["in_stock", "out_of_stock", "contact"])
export type StockStatus = z.infer<typeof stockStatusSchema>

/** One row of the spec table. `highlight` specs also show on product cards. */
export const productSpecSchema = z.object({
  label: z.string().trim().min(1), // "Diện tích lọc"
  value: z.string().trim().min(1), // "40"
  unit: z.string().trim().optional(), // "m²"
  highlight: z.boolean().default(false),
})
export type ProductSpec = z.infer<typeof productSpecSchema>

export const productSchema = z.object({
  id: idSchema,
  slug: slugSchema,
  categoryId: idSchema,
  name: z.string().trim().min(1),
  model: z.string().trim().optional(),
  code: z.string().trim().optional(), // "Mã"
  origin: z.string().trim().optional(), // "Xuất xứ"
  stockStatus: stockStatusSchema,
  /** VND. `null` renders as "Liên hệ" (the default on this site). */
  price: z.number().int().positive().nullable(),
  summary: z.string().trim(),
  /** Description tab, rich text HTML. */
  description: z.string(),
  specs: z.array(productSpecSchema).default([]),
  /** First image is the main/thumbnail image. */
  images: z.array(imageSchema).min(1, "Cần ít nhất 1 ảnh sản phẩm"),
  videoUrl: z.url().optional(),
  catalogUrl: z.string().min(1).optional(), // PDF
  faqs: z.array(faqItemSchema).default([]),
  /** Values for the category's filters: { "dien-tich-loc": "20-60" }. */
  filterValues: z.record(z.string(), z.string()).default({}),
  relatedProductIds: z.array(idSchema).default([]),
  rental: rentalInfoSchema.nullable(),
  featured: z.boolean().default(false), // homepage "Sản phẩm nổi bật"
  sortOrder: z.number().int().default(0),
  visibility: visibilitySchema,
  seo: seoFieldsSchema,
  ...timestampsSchema.shape,
})
export type Product = z.infer<typeof productSchema>

export const productInputSchema = productSchema.omit(serverManagedKeys)
export type ProductInput = z.infer<typeof productInputSchema>

/* ------------------------------------------------------------------ */
/* Read models – only the fields lists and cards render                */
/* ------------------------------------------------------------------ */

/** Category as shown in menus, cards and the sidebar. */
export type CategorySummary = Pick<ProductCategory, "slug" | "name" | "description">

/**
 * Product as shown on a card. The query layer derives the extra fields:
 * `keySpec` = first spec with `highlight`, `rentable` = `rental !== null`.
 */
export type ProductSummary = Pick<Product, "slug" | "name" | "price"> & {
  categorySlug: ProductCategory["slug"]
  keySpec: Pick<ProductSpec, "label" | "value" | "unit"> | null
  rentable: boolean
}
