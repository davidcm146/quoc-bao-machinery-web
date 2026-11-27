import Link from "next/link"
import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd } from "@/lib/seo"
import type { PageLink } from "@/types/seo"

/**
 * Visible breadcrumb + BreadcrumbList JSON-LD in one component.
 * Usage on inner pages:
 *   <Breadcrumbs items={[{ name: "Trang chủ", path: "/" }, { name: "Sản phẩm", path: "/san-pham" }]} />
 */
export function Breadcrumbs({ items }: { items: PageLink[] }) {
  return (
    <>
      <Breadcrumb className="container-page py-3">
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <Fragment key={item.path}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-semibold text-brand-dark">{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.path}>{item.name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  )
}
