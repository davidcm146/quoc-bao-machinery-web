import type { Metadata } from "next"
import type { BreadcrumbList, FAQPage, ItemList, LocalBusiness, WebSite, WithContext } from "schema-dts"

import { siteConfig } from "@/config/site"
import type { FaqItem } from "@/types/common"
import type { PageLink } from "@/types/seo"

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}

type PageMetadataInput = {
  title?: string
  description?: string
  path?: string
  images?: { url: string; alt?: string; width?: number; height?: number }[]
  type?: "website" | "article"
  noIndex?: boolean
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  images,
  type = "website",
  noIndex = false,
}: PageMetadataInput = {}): Metadata {
  const socialTitle = title ?? `${siteConfig.name} – ${siteConfig.tagline}`
  return {
    // Omit the key entirely when not set, otherwise it overrides the layout default title.
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: socialTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  }
}

export function organizationJsonLd(): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    telephone: siteConfig.contact.hotlineHref.replace("tel:", ""),
    email: siteConfig.contact.email,
    taxID: siteConfig.contact.taxId,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressCountry: "VN",
    },
    areaServed: { "@type": "Country", name: "Vietnam" },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  }
}

export function websiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    publisher: { "@id": absoluteUrl("/#organization") },
    // Enables the Google sitelinks search box; /tim-kiem?q= is the search route.
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/tim-kiem?q={search_term_string}"),
      },
      // schema-dts doesn't model the "query-input" shorthand
      ...({ "query-input": "required name=search_term_string" } as object),
    },
  }
}

export function breadcrumbJsonLd(items: PageLink[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/**
 * FAQPage schema. Only use it when the Q&A is visible on the page.
 * Google shows FAQ rich results mainly for authoritative gov/health sites now,
 * but the markup still helps search engines and AI answers understand the page.
 */
export function faqJsonLd(faqs: FaqItem[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
}

/** ItemList schema for listing pages (category, rental list, article list). */
export function itemListJsonLd(items: PageLink[]): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  }
}
