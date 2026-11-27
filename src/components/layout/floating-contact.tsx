import { PhoneIcon } from "lucide-react"

import { siteConfig } from "@/config/site"

/**
 * Fixed Zalo + call buttons shown on every page (proposal §2.1).
 * TODO(analytics): fire `click_zalo` / `click_call` events here (proposal §5.1).
 */
export function FloatingContact() {
  const { contact } = siteConfig
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-center gap-3 md:right-6 md:bottom-6">
      <a
        href={contact.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        className="flex size-12 items-center justify-center rounded-full bg-zalo text-xs font-bold text-zalo-foreground shadow-lg transition-transform hover:scale-105"
      >
        Zalo
      </a>
      <a
        href={contact.hotlineHref}
        aria-label={`Gọi ${contact.hotline}`}
        className="relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <span
          className="absolute inset-0 animate-ping rounded-full bg-primary/40 motion-reduce:hidden"
          aria-hidden
        />
        <PhoneIcon className="relative size-5" aria-hidden />
      </a>
    </div>
  )
}
