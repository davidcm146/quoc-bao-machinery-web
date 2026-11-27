import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

/**
 * /robots.txt
 * Only the production deployment may be indexed. Set NEXT_PUBLIC_APP_ENV=production
 * there; staging/preview builds block all crawlers so they never compete with
 * the live site in Google.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_APP_ENV === "production"

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/tim-kiem"],
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url,
  }
}
