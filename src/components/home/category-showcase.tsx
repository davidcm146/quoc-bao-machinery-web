import Link from "next/link"
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react"

import { ImagePlaceholder } from "@/components/shared/image-placeholder"
import { SectionHeading } from "@/components/shared/section-heading"
import { productCategories } from "@/config/site"
import { revealDelay } from "@/lib/reveal"
import { routes } from "@/lib/routes"

export function CategoryShowcase() {
  const machines = productCategories.slice(0, 3)
  const accessories = productCategories.slice(3)

  return (
    <section aria-labelledby="categories-title" className="container-page py-14 md:py-20">
      <SectionHeading
        align="center"
        eyebrow="Danh mục sản phẩm"
        title="Chọn dòng máy phù hợp với hệ thống của bạn"
        description="Ba dòng máy ép bùn chủ lực cùng đầy đủ thiết bị đi kèm và phụ tùng thay thế."
        id="categories-title"
      />

      <ul className="grid gap-5 md:grid-cols-3">
        {machines.map((category, index) => (
          <li key={category.slug} data-reveal style={revealDelay(index, 120)}>
            <Link
              href={routes.category(category.slug)}
              className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
            >
              <ImagePlaceholder
                label={`Ảnh ${category.name.toLowerCase()}`}
                className="aspect-video rounded-none transition-transform duration-300 group-hover:scale-[1.02] md:aspect-[4/3]"
              />
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-lg font-bold group-hover:text-primary">{category.name}</h3>
                <p className="flex-1 text-sm text-muted-foreground">{category.description}</p>
                <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-primary">
                  Xem các model
                  <ArrowRightIcon
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {accessories.map((category, index) => (
          <li key={category.slug} data-reveal style={revealDelay(index)}>
            <Link
              href={routes.category(category.slug)}
              className="group flex h-full items-center gap-3 rounded-xl border bg-surface p-3 transition-colors hover:border-primary"
            >
              <ImagePlaceholder label="Ảnh" className="size-14 shrink-0 [&>span]:hidden" />
              <span className="flex-1 text-sm font-semibold text-brand-dark group-hover:text-primary">
                {category.name}
              </span>
              <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
