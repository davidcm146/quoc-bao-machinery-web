import { ClipboardCheckIcon, FileTextIcon, ShieldCheckIcon, TruckIcon } from "lucide-react"

import { siteConfig } from "@/config/site"

const items = [
  { icon: ClipboardCheckIcon, title: "Khảo sát miễn phí", text: "Kỹ sư đến tận nơi" },
  { icon: FileTextIcon, title: "Báo giá trong ngày", text: `Gọi ${siteConfig.contact.hotline}` },
  {
    icon: ShieldCheckIcon,
    title: `Bảo hành ${siteConfig.warrantyMonths} tháng`,
    text: "Sẵn linh kiện thay thế",
  },
  { icon: TruckIcon, title: "Lắp đặt toàn quốc", text: "Chạy thử & đào tạo vận hành" },
]

/** USP strip overlapping the hero bottom edge. */
export function TrustStrip() {
  return (
    <section aria-label="Cam kết dịch vụ" className="relative z-10 container-page -mt-8">
      <ul className="grid grid-cols-2 gap-3 rounded-xl border bg-card p-3 shadow-md md:p-4 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3 rounded-lg p-2 md:p-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-bold text-brand-dark">{title}</span>
              <span className="text-xs text-muted-foreground">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
