import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImagePlaceholder } from "@/components/shared/image-placeholder"
import type { ProductSummary } from "@/features/products/schema"
import { routes } from "@/lib/routes"

const vnd = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })

export function ProductCard({ product }: { product: ProductSummary }) {
  const { name, price, keySpec, rentable } = product
  const href = routes.product(product.categorySlug, product.slug)

  return (
    <article className="group relative flex h-full flex-col gap-2 rounded-lg border bg-card p-3 transition-shadow hover:shadow-md">
      {rentable && <Badge className="absolute top-5 left-5 z-10">Có cho thuê</Badge>}
      <ImagePlaceholder label="Ảnh sản phẩm" className="aspect-[4/3] w-full" />
      <h3 className="line-clamp-2 text-sm font-bold md:text-base">
        {/* Stretched link: whole card is clickable, one link per product for crawlers */}
        <Link href={href} className="group-hover:text-primary after:absolute after:inset-0">
          {name}
        </Link>
      </h3>
      {keySpec && (
        <p className="text-xs text-muted-foreground">
          {keySpec.label}: {keySpec.value}
          {keySpec.unit && ` ${keySpec.unit}`}
        </p>
      )}
      <p className="font-bold text-primary">Giá: {price === null ? "Liên hệ" : vnd.format(price)}</p>
      <Button asChild variant="secondary" className="relative z-10 mt-auto w-full font-semibold">
        <Link href={`${href}#bao-gia`}>Nhận báo giá</Link>
      </Button>
    </article>
  )
}
