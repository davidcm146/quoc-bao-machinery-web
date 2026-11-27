import type { MetadataRoute } from "next"

import { footerNav, mainNav, productCategories, siteConfig } from "@/config/site"
import { routes } from "@/lib/routes"

/**
 * /sitemap.xml
 * Static routes come from the site config. When the data layer exists, append
 * products, rental machines, articles and projects here (with real `lastModified`),
 * or split into multiple sitemaps with `generateSitemaps` once there are > 50k URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const url = (path: string) => new URL(path, siteConfig.url).toString()

  const staticRoutes = [...mainNav, ...footerNav.policies].map((item) => ({
    url: url(item.href),
    lastModified: now,
    changeFrequency: item.href === "/" ? ("daily" as const) : ("weekly" as const),
    priority: item.href === "/" ? 1 : 0.8,
  }))

  const categoryRoutes = productCategories.map((category) => ({
    url: url(routes.category(category.slug)),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...categoryRoutes]
}
