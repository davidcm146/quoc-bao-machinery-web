import Link from "next/link"
import { HomeIcon, PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { siteConfig } from "@/config/site"
import { createMetadata } from "@/lib/seo"

// Next.js adds `noindex` to 404 responses automatically.
export const metadata = createMetadata({ title: "Không tìm thấy trang" })

/** Global 404 – keeps the site shell so visitors can navigate on. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container-page flex flex-1 flex-col items-center justify-center gap-5 py-24 text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="text-2xl font-bold md:text-3xl">Không tìm thấy trang bạn yêu cầu</h1>
        <p className="max-w-md text-muted-foreground">
          Trang có thể đã được di chuyển hoặc chưa được xây dựng. Hãy quay về trang chủ hoặc gọi cho chúng tôi
          để được tư vấn.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="h-11 px-5">
            <Link href="/">
              <HomeIcon data-icon="inline-start" />
              Về trang chủ
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 px-5">
            <a href={siteConfig.contact.hotlineHref}>
              <PhoneIcon data-icon="inline-start" />
              {siteConfig.contact.hotline}
            </a>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
