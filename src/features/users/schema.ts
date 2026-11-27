import { z } from "zod"

import { idSchema, timestampsSchema } from "@/types/common"

/* Admin accounts and roles (proposal §3.1) */

/** admin = full access; editor = content only (products, articles, projects). */
export const userRoleSchema = z.enum(["admin", "editor"])
export type UserRole = z.infer<typeof userRoleSchema>

/**
 * Public shape of an admin user. The password hash is deliberately NOT part of
 * this type so it can never be sent to the browser by accident; it lives only
 * in the database layer.
 */
export const adminUserSchema = z.object({
  id: idSchema,
  name: z.string().trim().min(1),
  email: z.email(),
  role: userRoleSchema,
  active: z.boolean().default(true),
  ...timestampsSchema.shape,
})
export type AdminUser = z.infer<typeof adminUserSchema>
