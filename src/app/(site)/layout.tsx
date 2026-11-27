import { FloatingContact } from "@/components/layout/floating-contact"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { JsonLd } from "@/components/seo/json-ld"
import { ScrollReveal } from "@/components/shared/scroll-reveal"
import { organizationJsonLd } from "@/lib/seo"

/**
 * Public website shell. The future Admin lives outside this route group
 * (e.g. src/app/admin) so it gets its own layout without header/footer.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Bỏ qua đến nội dung chính
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <FloatingContact />
      <ScrollReveal />
      {/* Without JS the observer never runs – keep revealed content visible */}
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;translate:none!important}`}</style>
      </noscript>
      <JsonLd data={organizationJsonLd()} />
    </>
  )
}
