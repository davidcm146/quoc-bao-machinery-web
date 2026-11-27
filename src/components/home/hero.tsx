import Link from "next/link"
import { ArrowRightIcon, CheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ImagePlaceholder } from "@/components/shared/image-placeholder"
import { siteConfig } from "@/config/site"

const highlights = [
  "Khung bản · Băng tải · Trục vít",
  "Bán mới & cho thuê theo công trình",
  "Lắp đặt, chạy thử, đào tạo vận hành",
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-brand-dark">
      {/* Decorative grid on the dark-green banner */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.07]"
      />
      <div className="relative container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div className="flex flex-col gap-6 text-brand-dark-foreground">
          <p className="w-fit rounded-full bg-primary/30 px-3 py-1 text-xs font-semibold tracking-wide text-brand-dark-foreground uppercase ring-1 ring-white/20">
            Giải pháp xử lý bùn thải trọn gói
          </p>
          {/* The only H1 on the homepage – contains the primary keyword */}
          <h1
            id="hero-title"
            className="text-3xl leading-tight font-bold text-brand-dark-foreground md:text-4xl lg:text-5xl"
          >
            Máy ép bùn cho hệ thống xử lý nước thải công nghiệp &amp; sinh hoạt
          </h1>
          <p className="max-w-xl text-base text-brand-dark-foreground/80 md:text-lg">
            {siteConfig.name} tư vấn, cung cấp và cho thuê máy ép bùn khung bản, băng tải, trục vít — chọn
            đúng máy theo lưu lượng và loại bùn thực tế của nhà máy bạn.
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary">
                  <CheckIcon className="size-3" aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-11 px-5 text-base">
              <Link href="#bao-gia">
                Nhận báo giá
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 border-white/40 bg-transparent px-5 text-base text-brand-dark-foreground hover:bg-white/10 hover:text-brand-dark-foreground"
            >
              <Link href="/san-pham">Xem sản phẩm</Link>
            </Button>
          </div>
        </div>

        <ImagePlaceholder
          label="Banner: ảnh máy ép bùn tại nhà máy"
          className="aspect-video w-full rounded-xl ring-1 ring-white/20 lg:aspect-[4/3]"
        />
      </div>
    </section>
  )
}
