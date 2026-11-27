import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Striped placeholder matching the mockup. Swap for `next/image` once real
 * photos exist — keep the same aspect-ratio class to avoid layout shift (CLS).
 */
export function ImagePlaceholder({ label = "Ảnh", className }: { label?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex items-center justify-center rounded-md placeholder-stripes text-xs text-muted-foreground",
        className
      )}
    >
      <span aria-hidden className="flex items-center gap-1.5 rounded bg-background/70 px-2 py-1">
        <ImageIcon className="size-3.5" aria-hidden />
        {label}
      </span>
    </div>
  )
}
