import { notFound } from "next/navigation"
import { ChevronRightIcon } from "lucide-react"

import { CategorySidebar } from "@/components/shared/category-sidebar"
import { ProductCard } from "@/components/shared/product-card"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { getProductCategory, productCategories } from "@/config/site"
import type { CategorySummary, ProductCategory, ProductSummary } from "@/features/products/schema"
import { routes } from "@/lib/routes"
import { createMetadata, faqJsonLd, itemListJsonLd } from "@/lib/seo"

/*
 * EXAMPLE: how a new page plugs into the SEO kit.
 *   1. generateStaticParams  → prerendered HTML for every category
 *   2. generateMetadata      → createMetadata() gives title, description, canonical, OG
 *   3. <Breadcrumbs>         → visible breadcrumb + BreadcrumbList JSON-LD
 *   4. <JsonLd>              → page-specific schema (ItemList, FAQPage)
 *   5. sitemap.ts            → already lists these URLs (from productCategories)
 */

type CategoryPageContent = Pick<ProductCategory, "intro" | "faqs" | "seo"> & {
  products: ProductSummary[]
}

/**
 * Placeholder content. TODO: replace with a DB query, e.g. getCategoryPage(slug),
 * returning the fields managed in Admin. Wrap it in React `cache()` so metadata
 * and page share one query.
 */
function getCategoryContent(category: CategorySummary): CategoryPageContent {
  return {
    intro: "[Đoạn giới thiệu 2-3 câu có từ khóa chính.]",
    faqs: [
      { question: `${category.name} giá bao nhiêu?`, answer: "[Câu trả lời do doanh nghiệp cung cấp.]" },
      { question: "Thời gian giao hàng và lắp đặt?", answer: "[Câu trả lời do doanh nghiệp cung cấp.]" },
      {
        question: "Bao lâu thì cần bảo trì, thay vải lọc?",
        answer: "[Câu trả lời do doanh nghiệp cung cấp.]",
      },
    ],
    // Empty SEO fields fall back to name/description in generateMetadata
    seo: { title: `${category.name} - Báo giá, thông số, lắp đặt toàn quốc` },
    products: Array.from({ length: 8 }, (_, i) => ({
      slug: `model-${i + 1}`,
      categorySlug: category.slug,
      name: `${category.name} [MODEL ${i + 1}]`,
      price: null,
      keySpec: { label: "Thông số chính", value: "[xx]" },
      rentable: false,
    })),
  }
}

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: PageProps<"/san-pham/[category]">) {
  const { category: slug } = await params
  const category = getProductCategory(slug)
  if (!category) return {}

  const { seo } = getCategoryContent(category)
  return createMetadata({
    title: seo.title ?? category.name,
    description: seo.description ?? category.description,
    path: routes.category(category.slug),
  })
}

export default async function CategoryPage({ params }: PageProps<"/san-pham/[category]">) {
  const { category: slug } = await params
  const category = getProductCategory(slug)
  if (!category) notFound()

  const { intro, products, faqs } = getCategoryContent(category)
  const path = routes.category(category.slug)

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Sản phẩm", path: "/san-pham" },
          { name: category.name, path },
        ]}
      />

      <div className="container-page grid gap-8 pb-16 lg:grid-cols-[260px_1fr]">
        <div className="order-last lg:order-first">
          <CategorySidebar activeHref={path} />
        </div>

        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2 rounded-xl bg-surface p-6">
            {/* One H1 per page, containing the category's primary keyword */}
            <h1 className="text-2xl font-bold md:text-3xl">{category.name}</h1>
            <p className="text-muted-foreground">{intro}</p>
          </header>

          <p className="border-b-2 border-primary pb-2 text-sm text-muted-foreground">
            Tìm thấy <strong className="text-brand-dark">{products.length}</strong> sản phẩm
          </p>

          <ul className="grid grid-cols-2 gap-3 md:gap-5 xl:grid-cols-3">
            {products.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          {/* Long-form SEO content, server-rendered (proposal §2.3) */}
          <section aria-labelledby="category-about" className="flex flex-col gap-4 rounded-xl border p-6">
            <h2 id="category-about" className="text-xl font-bold">
              {category.name} là gì?
            </h2>
            <p className="text-muted-foreground">
              [Nội dung SEO 300–600 chữ: cấu tạo, nguyên lý, ứng dụng, cách chọn công suất.]
            </p>

            <h2 className="pt-2 text-xl font-bold">Câu hỏi thường gặp</h2>
            {/* Native <details>: answers stay in the HTML for crawlers, works without JS */}
            <div className="flex flex-col divide-y">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-brand-dark">
                    <ChevronRightIcon
                      className="size-4 shrink-0 transition-transform group-open:rotate-90"
                      aria-hidden
                    />
                    {faq.question}
                  </summary>
                  <p className="pt-2 pl-6 text-sm text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>

      <JsonLd
        data={[
          itemListJsonLd(
            products.map((p) => ({ name: p.name, path: routes.product(p.categorySlug, p.slug) }))
          ),
          faqJsonLd(faqs),
        ]}
      />
    </>
  )
}
