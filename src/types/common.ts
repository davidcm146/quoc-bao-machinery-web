import { z } from "zod"

/*
 * Building blocks shared by every entity schema in src/features/*.
 * Database-agnostic: ids are plain strings (cuid/uuid/ObjectId all fit).
 */

export const idSchema = z.string().min(1)

/** URL segment: lowercase, no diacritics, words joined by "-" (e.g. "may-ep-bun-khung-ban"). */
export const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường không dấu, số và dấu gạch ngang")

export const timestampsSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
})

/** "Ẩn/hiện" toggle used by categories, products and projects in Admin. */
export const visibilitySchema = z.enum(["visible", "hidden"])
export type Visibility = z.infer<typeof visibilitySchema>

/** Uploaded image. `alt` is required: it is both accessibility and image SEO. */
export const imageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().trim().min(1, "Vui lòng nhập mô tả ảnh (alt)"),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
})
export type Image = z.infer<typeof imageSchema>

export const faqItemSchema = z.object({
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
})
export type FaqItem = z.infer<typeof faqItemSchema>

/** Vietnamese phone: 0xxxxxxxxx or +84xxxxxxxxx; spaces, dots and dashes are stripped. */
export const vnPhoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s.-]/g, ""))
  .pipe(z.string().regex(/^(?:\+?84|0)(?:3|5|7|8|9|2\d)\d{7,8}$/, "Số điện thoại không hợp lệ"))

/** Fields the server sets – stripped from Admin input schemas. */
export const serverManagedKeys = { id: true, createdAt: true, updatedAt: true } as const
