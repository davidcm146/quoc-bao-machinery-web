/** A link in the header, mobile menu, footer or sidebar. */
export type NavItem = {
  title: string
  href: string
  /** Short line under the title (products dropdown). */
  description?: string
}
