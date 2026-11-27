import { z } from "zod"

/*
 * Company-wide settings edited in Admin ("Thông tin chung", proposal §3.5).
 * Replaces the hard-coded values in src/config/site.ts once the data layer
 * exists. Single record, so no id/timestamps.
 */
export const siteSettingsSchema = z.object({
  companyName: z.string().trim().min(1),
  legalName: z.string().trim().min(1),
  address: z.string().trim().min(1),
  taxId: z.string().trim().min(1),
  hotline: z.string().trim().min(1), // display format, e.g. "0901 234 567"
  hotlineE164: z.string().regex(/^\+84\d{9,10}$/, "Định dạng +84xxxxxxxxx"), // tel: links & schema.org
  email: z.email(),
  zaloPhone: z.string().trim().optional(),
  zaloUrl: z.url().optional(),
  workingHours: z.string().trim().optional(),
  warrantyMonths: z.number().int().positive().optional(),
  social: z
    .object({
      facebook: z.url().optional(),
      youtube: z.url().optional(),
    })
    .default({}),
  /** Who receives an email when a quote/rental request arrives (§2.8). */
  notificationEmails: z.array(z.email()).min(1, "Cần ít nhất 1 email nhận thông báo"),
})
export type SiteSettings = z.infer<typeof siteSettingsSchema>
