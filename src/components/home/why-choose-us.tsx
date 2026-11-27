import { HardHatIcon, PackageCheckIcon, ShieldCheckIcon, TargetIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { revealDelay } from "@/lib/reveal"

const reasons = [
  {
    icon: TargetIcon,
    title: "Tư vấn đúng nhu cầu",
    text: "Chọn máy theo lưu lượng và loại bùn thực tế, không bán thừa công suất.",
  },
  {
    icon: HardHatIcon,
    title: "Lắp đặt tận nơi",
    text: "Đội kỹ thuật lắp đặt, chạy thử và hướng dẫn vận hành tại nhà máy.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Bảo hành rõ ràng",
    text: `Bảo hành ${siteConfig.warrantyMonths} tháng, hỗ trợ kỹ thuật nhanh khi có sự cố.`,
  },
  {
    icon: PackageCheckIcon,
    title: "Sẵn phụ tùng",
    text: "Vải lọc, tấm lọc và linh kiện thay thế luôn có sẵn trong kho.",
  },
]

/** Placeholder figures – the client must confirm real numbers before launch. */
const stats = [
  { value: "[xx]+", label: "Năm kinh nghiệm" },
  { value: "[xx]+", label: "Dự án đã bàn giao" },
  { value: "[xx]", label: "Tỉnh thành phục vụ" },
  { value: "24/7", label: "Hỗ trợ kỹ thuật" },
]

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="bg-brand-dark py-14 text-brand-dark-foreground md:py-20">
      <div className="container-page flex flex-col gap-12">
        <div data-reveal className="mx-auto flex max-w-2xl flex-col gap-2 text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-dark-foreground/70 uppercase">
            Vì sao chọn chúng tôi
          </p>
          <h2 id="why-title" className="text-2xl font-bold text-brand-dark-foreground md:text-3xl">
            Vì sao chọn {siteConfig.name}?
          </h2>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              data-reveal
              style={revealDelay(index)}
              className="flex flex-col gap-3 rounded-xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="text-lg font-bold text-brand-dark-foreground">{title}</h3>
              <p className="text-sm text-brand-dark-foreground/75">{text}</p>
            </li>
          ))}
        </ul>

        <dl className="grid grid-cols-2 gap-6 border-t border-white/15 pt-10 text-center lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              data-reveal="fade"
              style={revealDelay(index)}
              className="flex flex-col-reverse gap-1"
            >
              <dt className="text-sm text-brand-dark-foreground/70">{stat.label}</dt>
              <dd className="text-3xl font-bold md:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
