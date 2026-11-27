import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/shared/product-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ProductSummary } from "@/features/products/schema"
import { revealDelay } from "@/lib/reveal"
import { routes } from "@/lib/routes"

function placeholderProducts(
  categorySlug: string,
  label: string,
  keySpec: ProductSummary["keySpec"],
  rentableIndex?: number
): ProductSummary[] {
  return [1, 2, 3, 4].map((n) => ({
    slug: `model-${n}`,
    categorySlug,
    name: `Máy ép bùn ${label.toLowerCase()} [MODEL ${n}]`,
    price: null,
    keySpec,
    rentable: n === rentableIndex,
  }))
}

const groups: { categorySlug: string; label: string; products: ProductSummary[] }[] = [
  {
    categorySlug: "may-ep-bun-khung-ban",
    label: "Khung bản",
    products: placeholderProducts(
      "may-ep-bun-khung-ban",
      "Khung bản",
      { label: "Diện tích lọc", value: "[xx]", unit: "m²" },
      1
    ),
  },
  {
    categorySlug: "may-ep-bun-bang-tai",
    label: "Băng tải",
    products: placeholderProducts(
      "may-ep-bun-bang-tai",
      "Băng tải",
      { label: "Khổ băng", value: "[xx]", unit: "mm" },
      2
    ),
  },
  {
    categorySlug: "may-ep-bun-truc-vit",
    label: "Trục vít",
    products: placeholderProducts("may-ep-bun-truc-vit", "Trục vít", {
      label: "Công suất",
      value: "[xx]",
      unit: "kg DS/h",
    }),
  },
]

export function FeaturedProducts() {
  return (
    <section aria-labelledby="featured-title" className="bg-surface py-14 md:py-20">
      <div className="container-page">
        <Tabs defaultValue={groups[0].categorySlug} className="gap-6">
          <div data-reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">Sản phẩm nổi bật</p>
              <h2 id="featured-title" className="text-2xl font-bold md:text-3xl">
                Máy ép bùn được chọn nhiều nhất
              </h2>
            </div>
            <TabsList>
              {groups.map((group) => (
                <TabsTrigger key={group.categorySlug} value={group.categorySlug}>
                  {group.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {groups.map((group) => (
            // forceMount keeps every tab's links in the HTML for crawlers
            <TabsContent
              key={group.categorySlug}
              value={group.categorySlug}
              forceMount
              className="data-[state=inactive]:hidden"
            >
              <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
                {group.products.map((product, index) => (
                  <li key={product.slug} data-reveal style={revealDelay(index)}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex justify-center">
                <Button asChild variant="outline" size="lg" className="h-10 px-5">
                  <Link href={routes.category(group.categorySlug)}>
                    Xem tất cả máy ép bùn {group.label.toLowerCase()}
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
