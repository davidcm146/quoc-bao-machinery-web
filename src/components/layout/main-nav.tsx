"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRightIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { mainNav, productCategoryNav } from "@/config/site"
import { cn } from "@/lib/utils"

/*
 * Green-bar item styles. They must override shadcn's light `bg-muted` hover/active
 * defaults, so pass them to NavigationMenuLink/Trigger's own `className` (merged by
 * cn), never to the asChild <Link> (that only concatenates classes).
 */
const itemClass =
  "inline-flex h-11 items-center rounded-none px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark/40 hover:text-primary-foreground focus:bg-brand-dark/40 focus:text-primary-foreground"

const linkActiveClass =
  "data-active:bg-brand-dark/50 data-active:hover:bg-brand-dark/60 data-active:focus:bg-brand-dark/60"

const triggerStateClass =
  "data-[active=true]:bg-brand-dark/50 data-open:bg-brand-dark/40 data-open:hover:bg-brand-dark/40 data-open:focus:bg-brand-dark/40 data-popup-open:bg-brand-dark/40 data-popup-open:hover:bg-brand-dark/40"

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
}

/** Desktop navigation bar (green strip under the header). */
export function MainNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Điều hướng chính" className="hidden bg-primary lg:block">
      <div className="container-page">
        <NavigationMenu viewport={false} className="max-w-none justify-start">
          <NavigationMenuList className="justify-start">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href)

              if (item.href === "/san-pham") {
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger data-active={active} className={cn(itemClass, triggerStateClass)}>
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[560px] grid-cols-2 gap-1 p-2">
                        {productCategoryNav.map((category) => (
                          <li key={category.href}>
                            <NavigationMenuLink asChild active={isActivePath(pathname, category.href)}>
                              <Link href={category.href} className="flex-col items-start gap-0.5">
                                <span className="font-semibold text-brand-dark">{category.title}</span>
                                <span className="line-clamp-1 text-xs text-muted-foreground">
                                  {category.description}
                                </span>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                        <li className="col-span-2 border-t pt-1">
                          <NavigationMenuLink asChild>
                            <Link href="/san-pham" className="font-semibold text-primary">
                              Xem tất cả sản phẩm
                              <ArrowRightIcon aria-hidden />
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              }

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild active={active} className={cn(itemClass, linkActiveClass)}>
                    <Link href={item.href} aria-current={active ? "page" : undefined}>
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
