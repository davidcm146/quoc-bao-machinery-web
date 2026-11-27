import Link from "next/link"
import { MapPinIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ImagePlaceholder } from "@/components/shared/image-placeholder"
import { SectionHeading } from "@/components/shared/section-heading"
import type { ProjectSummary } from "@/features/projects/schema"
import { revealDelay } from "@/lib/reveal"
import { routes } from "@/lib/routes"

/** TODO: replace with featured projects from the database (`featured = true`). */
const projects: ProjectSummary[] = ["Máy ép bùn khung bản", "Máy ép bùn băng tải", "Máy ép bùn trục vít"].map(
  (categoryName, i) => ({
    slug: `du-an-${i + 1}`,
    name: `[Tên dự án ${i + 1}]`,
    location: "[Địa điểm]",
    categoryName,
  })
)

export function ProjectsShowcase() {
  return (
    <section aria-labelledby="projects-title" className="bg-surface py-14 md:py-20">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          eyebrow="Dự án tiêu biểu"
          title="Dự án đã thực hiện"
          href="/du-an"
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.slug} data-reveal style={revealDelay(index, 120)}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card">
                <ImagePlaceholder label="Ảnh dự án" className="aspect-video rounded-none" />
                <div className="flex flex-col gap-2 p-5">
                  {project.categoryName && (
                    <Badge variant="secondary" className="w-fit">
                      {project.categoryName}
                    </Badge>
                  )}
                  <h3 className="text-base font-bold">
                    <Link
                      href={routes.project(project.slug)}
                      className="group-hover:text-primary after:absolute after:inset-0"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPinIcon className="size-3.5" aria-hidden />
                    {project.location}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
