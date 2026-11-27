import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

/** Text logo placeholder — replace the mark with the client's SVG logo. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} – Trang chủ`}
      className={cn("flex shrink-0 items-center gap-2", className)}
    >
      <span
        aria-hidden
        className="flex size-9 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground"
      >
        LOGO
      </span>
      <span className="text-lg leading-tight font-bold text-brand-dark md:text-xl">{siteConfig.name}</span>
    </Link>
  )
}
