import { z } from "zod"

import { idSchema, timestampsSchema, vnPhoneSchema } from "@/types/common"

/*
 * Customer requests from the website forms (proposal §2.8, §3.6).
 * The *FormSchema objects validate both the browser form and the server
 * handler, so the rules can never drift apart.
 */

/* ---- Form input ---------------------------------------------------- */

export const quoteFormSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  phone: vnPhoneSchema,
  need: z.string().trim().max(1000).optional(),
  /** Auto-attached when sent from a product page. */
  productId: idSchema.optional(),
})
export type QuoteFormInput = z.input<typeof quoteFormSchema>
export type QuoteFormData = z.output<typeof quoteFormSchema>

export const rentalFormSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  phone: vnPhoneSchema,
  company: z.string().trim().optional(),
  /** "Máy cần thuê" – picked from rentable products. */
  productId: idSchema.optional(),
  startDate: z.coerce.date({ error: "Vui lòng chọn ngày bắt đầu" }),
  /** Free text, e.g. "2 tháng". */
  duration: z.string().trim().min(1, "Vui lòng nhập thời gian thuê dự kiến"),
  location: z.string().trim().min(1, "Vui lòng nhập địa điểm sử dụng"),
  note: z.string().trim().max(1000).optional(),
})
export type RentalFormInput = z.input<typeof rentalFormSchema>
export type RentalFormData = z.output<typeof rentalFormSchema>

/* ---- Stored lead (Admin) ------------------------------------------- */

/** new = "Mới", contacting = "Đang liên hệ", done = "Đã xử lý". */
export const leadStatusSchema = z.enum(["new", "contacting", "done"])
export type LeadStatus = z.infer<typeof leadStatusSchema>

const leadBaseSchema = z.object({
  id: idSchema,
  status: leadStatusSchema,
  /** Page the form was sent from – useful for Ads/landing-page reporting. */
  sourceUrl: z.string().optional(),
  ...timestampsSchema.shape,
})

export const leadSchema = z.discriminatedUnion("type", [
  leadBaseSchema.extend({ type: z.literal("quote"), ...quoteFormSchema.shape }),
  leadBaseSchema.extend({ type: z.literal("rental"), ...rentalFormSchema.shape }),
])
export type Lead = z.infer<typeof leadSchema>
export type LeadType = Lead["type"]
