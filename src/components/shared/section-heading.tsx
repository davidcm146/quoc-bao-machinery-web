import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Section title with the green underline rule and optional "Xem tất cả →"
 * link, as used for every content block in the Option C mockups.
 */
export function SectionHeading({
  title,
  id,
  eyebrow,
  description,
  href,
  linkLabel = "Xem tất cả",
  align = "left",
  as: Heading = "h2",
  className,
}: {
  title: string
  /** Pass and reference via `aria-labelledby` on the parent <section>. */
  id?: string
  eyebrow?: string
  description?: string
  href?: string
  linkLabel?: string
  align?: "left" | "center"
  as?: "h1" | "h2" | "h3"
  className?: string
}) {
  if (align === "center") {
    return (
      <div
        data-reveal
        className={cn("mx-auto mb-8 flex max-w-2xl flex-col items-center gap-2 text-center", className)}
      >
        {eyebrow && <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>}
        <Heading id={id} className="text-2xl font-bold md:text-3xl">
          {title}
        </Heading>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    )
  }

  return (
    <div data-reveal className={cn("mb-6 flex flex-col gap-1 border-b-2 border-primary pb-2", className)}>
      {eyebrow && <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>}
      <div className="flex items-end justify-between gap-4">
        <Heading id={id} className="text-xl font-bold md:text-2xl">
          {title}
        </Heading>
        {href && (
          <Link
            href={href}
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {linkLabel}
            <ArrowRightIcon className="size-4" aria-hidden />
          </Link>
        )}
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
