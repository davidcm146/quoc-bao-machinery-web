"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronRightIcon, MenuIcon, PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HeaderSearch } from "@/components/layout/header-search"
import { isActivePath } from "@/components/layout/main-nav"
import { mainNav, productCategoryNav, siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

/** Hamburger menu for < lg screens. */
export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon-lg" className="lg:hidden" aria-label="Mở menu">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] max-w-sm gap-0 overflow-y-auto">
        <SheetHeader className="border-b">
          <SheetTitle className="text-brand-dark">{siteConfig.name}</SheetTitle>
          <SheetDescription>{siteConfig.tagline}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 p-4">
          <HeaderSearch id="mobile-search" />

          <nav aria-label="Menu di động" className="flex flex-col">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-semibold text-brand-dark hover:bg-accent",
                    active && "bg-accent text-primary"
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>

          <Separator />

          <div className="flex flex-col">
            <p className="px-3 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Danh mục sản phẩm
            </p>
            {productCategoryNav.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                {category.title}
                <ChevronRightIcon className="size-4 text-muted-foreground" aria-hidden />
              </Link>
            ))}
          </div>

          <Button asChild size="lg" className="h-11">
            <a href={siteConfig.contact.hotlineHref}>
              <PhoneIcon data-icon="inline-start" />
              Gọi {siteConfig.contact.hotline}
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
