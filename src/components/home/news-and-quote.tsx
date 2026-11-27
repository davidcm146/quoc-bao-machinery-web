import Link from "next/link"
import { PhoneIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePlaceholder } from "@/components/shared/image-placeholder"
import { SectionHeading } from "@/components/shared/section-heading"
import { QuoteForm } from "@/components/home/quote-form"
import { siteConfig } from "@/config/site"
import type { ArticleSummary } from "@/features/articles/schema"
import { revealDelay } from "@/lib/reveal"
import { routes } from "@/lib/routes"

const dateFormat = new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeZone: "Asia/Ho_Chi_Minh" })

/** TODO: replace with the latest published articles from the database. */
const articles: ArticleSummary[] = [
  {
    title: "So sánh máy ép bùn khung bản và băng tải: nên chọn loại nào?",
    slug: "so-sanh-may-ep-bun-khung-ban-va-bang-tai",
    excerpt: "Khác biệt về độ khô bùn, chi phí đầu tư và chế độ vận hành giữa hai dòng máy phổ biến nhất.",
    publishedAt: null,
  },
  {
    title: "Cách chọn máy ép bùn theo lưu lượng bùn",
    slug: "cach-chon-may-ep-bun-theo-luu-luong",
    excerpt: "Hướng dẫn tính công suất máy dựa trên lưu lượng, nồng độ bùn và thời gian vận hành.",
    publishedAt: null,
  },
  {
    title: "Bảo trì máy ép bùn trục vít đúng cách",
    slug: "bao-tri-may-ep-bun-truc-vit",
    excerpt: "Checklist bảo trì định kỳ giúp máy vận hành ổn định và kéo dài tuổi thọ.",
    publishedAt: null,
  },
]

export function NewsAndQuote() {
  return (
    <section className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <SectionHeading id="news-title" title="Tin tức & kiến thức" href="/kien-thuc" />
        <ul className="flex flex-col gap-5">
          {articles.map((article, index) => (
            <li key={article.slug} data-reveal style={revealDelay(index)}>
              <article className="group relative grid grid-cols-[7rem_1fr] gap-4 sm:grid-cols-[10rem_1fr]">
                <ImagePlaceholder label="Ảnh" className="aspect-[4/3]" />
                <div className="flex flex-col gap-1.5">
                  <h3 className="line-clamp-2 text-base font-bold">
                    <Link
                      href={routes.article(article.slug)}
                      className="group-hover:text-primary after:absolute after:inset-0"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-2 hidden text-sm text-muted-foreground sm:block">
                    {article.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {article.publishedAt ? (
                      <time dateTime={article.publishedAt.toISOString()}>
                        {dateFormat.format(article.publishedAt)}
                      </time>
                    ) : (
                      "[Ngày đăng]"
                    )}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <Card id="bao-gia" data-reveal style={revealDelay(1)} className="scroll-mt-24 border-2 border-primary">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-brand-dark">Yêu cầu báo giá nhanh</CardTitle>
          <CardDescription>
            Để lại thông tin, kỹ sư sẽ gọi lại tư vấn trong giờ làm việc. Hoặc gọi ngay{" "}
            <a
              href={siteConfig.contact.hotlineHref}
              className="inline-flex items-center gap-1 font-semibold text-primary"
            >
              <PhoneIcon className="size-3.5" aria-hidden />
              {siteConfig.contact.hotline}
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuoteForm />
        </CardContent>
      </Card>
    </section>
  )
}
