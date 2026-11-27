import { CategoryShowcase } from "@/components/home/category-showcase"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Hero } from "@/components/home/hero"
import { NewsAndQuote } from "@/components/home/news-and-quote"
import { ProcessSteps } from "@/components/home/process-steps"
import { ProjectsShowcase } from "@/components/home/projects-showcase"
import { RentalPromo } from "@/components/home/rental-promo"
import { TrustStrip } from "@/components/home/trust-strip"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { createMetadata, websiteJsonLd } from "@/lib/seo"

export const metadata = createMetadata({
  // Homepage uses the root default title (brand first), so no `title` here.
  description: siteConfig.description,
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryShowcase />
      <FeaturedProducts />
      <RentalPromo />
      <WhyChooseUs />
      <ProcessSteps />
      <ProjectsShowcase />
      <NewsAndQuote />
      <JsonLd data={websiteJsonLd()} />
    </>
  )
}
