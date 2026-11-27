# Website Quoc Bao Machinery

A Next.js (App Router) app for both the public website and the backend (Route Handlers / Server Actions, added later).

## Stack

| Concern    | Choice                                                           |
| ---------- | ---------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, Cache Components), React 19   |
| Styling    | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)       |
| UI kit     | shadcn/ui (`radix-nova` style, Radix primitives)                 |
| Icons      | lucide-react                                                     |
| Forms      | react-hook-form + zod + @hookform/resolvers                      |
| Toasts     | sonner                                                           |
| SEO typing | schema-dts (typed JSON-LD)                                       |
| Tooling    | pnpm, ESLint, Prettier + prettier-plugin-tailwindcss, TypeScript |

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`, `pnpm format`.

Add shadcn components with `pnpm dlx shadcn@latest add <component>`.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx            # <html lang="vi">, font, global metadata, viewport, Toaster
│  ├─ (site)/               # public website route group (header + footer + floating contact)
│  │  ├─ layout.tsx
│  │  └─ page.tsx           # homepage
│  ├─ not-found.tsx         # 404 page (noindex)
│  ├─ sitemap.ts            # /sitemap.xml
│  ├─ robots.ts             # /robots.txt (blocks crawlers unless NEXT_PUBLIC_APP_ENV=production)
│  ├─ manifest.ts           # /manifest.webmanifest
│  ├─ opengraph-image.tsx   # default 1200×630 share image (Facebook/Zalo)
│  └─ icon.svg              # favicon placeholder
├─ components/
│  ├─ ui/                   # shadcn components (generated, don't hand-edit styling)
│  ├─ layout/               # top-bar, site-header, main-nav, mobile-nav, header-search, site-footer, floating-contact, logo
│  ├─ home/                 # homepage sections
│  ├─ shared/               # product-card, section-heading, image-placeholder
│  └─ seo/                  # json-ld, breadcrumbs (visible + BreadcrumbList schema)
├─ config/site.ts           # company info, nav, product categories (move to Admin later)
├─ features/                # one folder per business area (entity types now; queries/actions later)
│  ├─ products/schema.ts    # ProductCategory, Product, RentalInfo, ProductSpec
│  ├─ articles/schema.ts    # Article, ArticleTopic
│  ├─ content/schema.ts     # editable fixed pages (about, contact, policies, rental service)
│  ├─ settings/schema.ts    # SiteSettings (hotline, Zalo, notification emails…)
│  └─ users/schema.ts       # AdminUser, roles
├─ types/
│  ├─ common.ts             # id, slug, timestamps, image (with alt), FAQ, company phone
│  ├─ nav.ts                # NavItem (menus, footer, sidebar)
│  └─ seo.ts                # SeoFields (only on entities with a public page), PageLink
└─ lib/
   ├─ seo.ts                # createMetadata(), Organization/WebSite/Breadcrumb JSON-LD
   ├─ routes.ts             # URL patterns for entity pages (category, product, article, project)
   └─ utils.ts              # cn()
```

The future **Admin** should live outside the `(site)` group (e.g. `src/app/admin/`) so it gets its own layout. **API** routes go in `src/app/api/`.

### Entity types

Each entity is a **zod schema**, and its TypeScript type is inferred from it (`type Product = z.infer<typeof productSchema>`). One definition gives both the type and the validation for Admin forms and API input. Each feature also exports an `…InputSchema` without `id`/`createdAt`/`updatedAt` for create and update forms.

**Read models.** Lists and cards don't take full entities. They take a `Pick<>` of the fields they render: `CategorySummary`, `ProductSummary`, `ArticleSummary`, `ProjectSummary`. The homepage and category page placeholder data are typed with these, so a DB query that returns the same type can replace them without touching the components. Fixed marketing copy (hero highlights, USP strip, reasons, stats, process steps, rental benefits, menus) stays as plain constants in the components. It never comes from the database, so it has no entity type.

When features gain data access, add files next to `schema.ts`, e.g. `queries.ts` (server-only reads), `actions.ts` (Server Actions) and `mappers.ts` (entity → UI props such as `ProductCardProps`).

## Design tokens (Option C)

Defined in `src/app/globals.css` and used as Tailwind classes:

| Token                    | Use                                          | Class examples                     |
| ------------------------ | -------------------------------------------- | ---------------------------------- |
| `--primary` #15803d      | Nav bar, CTA buttons, prices, links          | `bg-primary`, `text-primary`       |
| `--brand-dark` #0f3d22   | Headings, panel/table headers, dark sections | `text-brand-dark`, `bg-brand-dark` |
| `--surface` #eef6ef      | Top bar, alternate sections, footer          | `bg-surface`                       |
| `--secondary`/`--accent` | Soft-green buttons ("Nhận báo giá" on cards) | `variant="secondary"`, `bg-accent` |
| `--zalo` #0068ff         | Zalo button                                  | `bg-zalo`                          |

Utilities: `container-page` (76rem content width) and `placeholder-stripes` (striped image placeholder).

## SEO checklist (proposal §4)

- [x] `lang="vi"`, title template, meta description, keywords, canonical, Open Graph, Twitter card
- [x] `createMetadata()` helper: every new page calls it with its own `title`, `description` and `path`
- [x] JSON-LD: LocalBusiness (site-wide), WebSite + SearchAction (home), BreadcrumbList (`<Breadcrumbs>`)
- [x] `sitemap.xml`, `robots.txt` (environment-aware), web manifest, default OG image, 404 page
- [x] Semantic landmarks: one H1 per page, skip link, `aria-labelledby` sections
- [x] Security headers, `poweredByHeader: false`, AVIF/WebP images, `redirects()` hook for 301s
- [ ] Replace placeholders in `src/config/site.ts`, add the real logo and photos (`next/image`)
- [ ] Add dynamic routes (products, articles, projects) to the sitemap once the data layer exists
- [ ] Product/Article/FAQ JSON-LD on the detail pages
- [ ] Analytics events (`submit_quote`, `click_call`, `click_zalo`, `download_catalog`); see the TODOs
