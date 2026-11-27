import Link from "next/link"
import { ChevronRightIcon, MenuIcon, PhoneIcon } from "lucide-react"

import { productCategoryNav, siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

/**
 * "Danh mục sản phẩm" panel + consult box from the mockups (category, product
 * and article pages). Pass the current category href to highlight it.
 */
export function CategorySidebar({ activeHref }: { activeHref?: string }) {
  return (
    <aside className="flex flex-col gap-4">
      <nav aria-label="Danh mục sản phẩm" className="overflow-hidden rounded-lg border bg-card">
        <p className="flex items-center gap-2 bg-brand-dark px-4 py-3 text-sm font-bold text-brand-dark-foreground">
          <MenuIcon className="size-4" aria-hidden />
          Danh mục sản phẩm
        </p>
        <ul className="divide-y">
          {productCategoryNav.map((category) => {
            const active = category.href === activeHref
            return (
              <li key={category.href}>
                <Link
                  href={category.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-sm hover:bg-accent hover:text-primary",
                    active && "bg-accent font-semibold text-primary"
                  )}
                >
                  {category.title}
                  <ChevronRightIcon className="size-4 text-muted-foreground" aria-hidden />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-1 rounded-lg bg-primary p-4 text-primary-foreground">
        <p className="font-bold">Cần tư vấn chọn máy?</p>
        <a href={siteConfig.contact.hotlineHref} className="flex items-center gap-1.5 text-sm">
          <PhoneIcon className="size-3.5" aria-hidden />
          Gọi kỹ sư: {siteConfig.contact.hotline}
        </a>
      </div>
    </aside>
  )
}
