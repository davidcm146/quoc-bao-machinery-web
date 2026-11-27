import Link from "next/link"
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, ReceiptTextIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/layout/logo"
import { footerNav, productCategoryNav, siteConfig } from "@/config/site"
import type { NavItem } from "@/types/nav"

function FooterLinks({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3">
      <h2 className="text-sm font-bold tracking-wide uppercase">{title}</h2>
      <ul className="flex flex-col gap-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-muted-foreground hover:text-primary">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Cached so the footer can still be prerendered (Cache Components). */
async function CurrentYear() {
  "use cache"
  return new Date().getFullYear()
}

export function SiteFooter() {
  const { contact } = siteConfig

  return (
    <footer className="mt-auto bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Company info – NAP (name/address/phone) must match the LocalBusiness JSON-LD */}
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">{siteConfig.description}</p>
          <address className="flex flex-col gap-2 text-sm not-italic">
            <span className="flex gap-2">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {contact.address}
            </span>
            <span className="flex gap-2">
              <ReceiptTextIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              MST: {contact.taxId}
            </span>
          </address>
        </div>

        <FooterLinks title="Sản phẩm" items={productCategoryNav} />
        <FooterLinks title="Hỗ trợ khách hàng" items={[...footerNav.support, ...footerNav.policies]} />

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold tracking-wide uppercase">Liên hệ</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a href={contact.hotlineHref} className="flex gap-2 font-semibold text-primary">
                <PhoneIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
                Hotline: {contact.hotline}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex gap-2 text-muted-foreground hover:text-primary"
              >
                <MailIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {contact.email}
              </a>
            </li>
            <li className="flex gap-2 text-muted-foreground">
              <ClockIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {contact.workingHours}
            </li>
          </ul>
        </div>
      </div>

      <Separator />

      <div className="container-page flex flex-col gap-2 py-5 pr-20 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:pr-28">
        <p>
          © <CurrentYear /> {siteConfig.legalName}. Bảo lưu mọi quyền.
        </p>
        <ul className="flex gap-4">
          {footerNav.policies.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-primary">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
