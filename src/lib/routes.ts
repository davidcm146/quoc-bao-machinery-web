/**
 * URL patterns for entity pages, in one place, so links, canonicals and the
 * sitemap can never drift apart. Fixed pages keep their hrefs in config/site.ts.
 */
export const routes = {
  category: (slug: string) => `/san-pham/${slug}`,
  product: (categorySlug: string, slug: string) => `/san-pham/${categorySlug}/${slug}`,
  article: (slug: string) => `/kien-thuc/${slug}`,
  project: (slug: string) => `/du-an/${slug}`,
}
