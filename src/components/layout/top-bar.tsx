import { MailIcon, MessageCircleIcon } from "lucide-react"

import { siteConfig } from "@/config/site"

export function TopBar() {
  const { contact, warrantyMonths } = siteConfig
  return (
    <div className="hidden bg-surface text-xs text-brand-dark md:block">
      <div className="container-page flex h-8 items-center justify-between gap-4">
        <p>Khảo sát miễn phí · Lắp đặt toàn quốc · Bảo hành {warrantyMonths} tháng</p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-primary">
            <MailIcon className="size-3.5" aria-hidden />
            {contact.email}
          </a>
          <a
            href={contact.zaloHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary"
          >
            <MessageCircleIcon className="size-3.5" aria-hidden />
            Zalo: {contact.zalo}
          </a>
        </div>
      </div>
    </div>
  )
}
