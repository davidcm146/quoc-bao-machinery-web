import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/**
 * Plain GET form → /tim-kiem?q=… so search works without JavaScript and
 * matches the SearchAction declared in the WebSite JSON-LD.
 */
export function HeaderSearch({ className, id = "site-search" }: { className?: string; id?: string }) {
  return (
    <form
      action="/tim-kiem"
      method="get"
      role="search"
      className={cn(
        "flex h-10 w-full items-center overflow-hidden rounded-lg border-2 border-primary bg-background",
        className
      )}
    >
      <label htmlFor={id} className="sr-only">
        Tìm kiếm sản phẩm
      </label>
      <Input
        id={id}
        name="q"
        type="search"
        placeholder="Bạn cần tìm máy ép bùn nào?"
        className="h-full flex-1 rounded-none border-0 shadow-none focus-visible:ring-0"
      />
      <Button type="submit" size="icon-lg" className="h-full w-11 rounded-none" aria-label="Tìm kiếm">
        <SearchIcon />
      </Button>
    </form>
  )
}
