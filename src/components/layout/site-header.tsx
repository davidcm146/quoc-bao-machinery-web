import { PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeaderSearch } from "@/components/layout/header-search"
import { Logo } from "@/components/layout/logo"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { TopBar } from "@/components/layout/top-bar"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
  const { contact } = siteConfig

  return (
    <header className="sticky top-0 z-40 bg-background shadow-xs lg:static lg:shadow-none">
      <TopBar />

      <div className="container-page flex h-16 items-center gap-3 md:h-20 md:gap-6">
        <MobileNav />
        <Logo className="mr-auto lg:mr-0" />

        <HeaderSearch className="hidden max-w-2xl flex-1 md:flex" />

        <a
          href={contact.hotlineHref}
          className="hidden shrink-0 items-center gap-2.5 lg:flex"
          aria-label={`Gọi hotline ${contact.hotline}`}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-accent text-primary">
            <PhoneIcon className="size-4" aria-hidden />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xs text-muted-foreground">Hotline 24/7</span>
            <span className="text-lg font-bold text-primary">{contact.hotline}</span>
          </span>
        </a>

        <Button asChild size="icon-lg" className="lg:hidden" aria-label="Gọi hotline">
          <a href={contact.hotlineHref}>
            <PhoneIcon />
          </a>
        </Button>
      </div>

      <MainNav />
    </header>
  )
}
