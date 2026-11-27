import type { CategorySummary } from "@/features/products/schema"
import { routes } from "@/lib/routes"
import type { NavItem } from "@/types/nav"

/**
 * Global site configuration.
 *
 * Every value wrapped in [BRACKETS] is a placeholder from the Option C mockup
 * and must be replaced with the client's real information before launch.
 * Later these values will be editable from the Admin ("Thông tin chung").
 */

export const siteConfig = {
  name: "[TÊN CÔNG TY]",
  shortName: "[TÊN CÔNG TY]",
  legalName: "[TÊN PHÁP LÝ CÔNG TY]",
  tagline: "Máy ép bùn khung bản, băng tải, trục vít",
  description:
    "Cung cấp, cho thuê và lắp đặt máy ép bùn khung bản, băng tải, trục vít cho hệ thống xử lý nước thải công nghiệp và sinh hoạt. Khảo sát miễn phí, báo giá trong ngày, bảo hành rõ ràng.",
  keywords: [
    "máy ép bùn",
    "máy ép bùn khung bản",
    "máy ép bùn băng tải",
    "máy ép bùn trục vít",
    "cho thuê máy ép bùn",
    "bồn pha hóa chất",
    "bơm bùn",
    "vải lọc máy ép bùn",
    "xử lý nước thải",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "vi_VN",
  language: "vi",

  contact: {
    hotline: "[HOTLINE]",
    hotlineHref: "tel:+84000000000",
    email: "[EMAIL]",
    zalo: "[SỐ ZALO]",
    zaloHref: "https://zalo.me/0000000000",
    address: "[ĐỊA CHỈ]",
    taxId: "[MÃ SỐ THUẾ]",
    workingHours: "Thứ 2 - Thứ 7: 7:30 - 17:30",
  },

  warrantyMonths: "[xx]",

  social: {
    facebook: "",
    youtube: "",
  },
} as const

/** Main navigation (proposal §2.1 – includes "Cho thuê máy") */
export const mainNav: NavItem[] = [
  { title: "Trang chủ", href: "/" },
  { title: "Giới thiệu", href: "/gioi-thieu" },
  { title: "Sản phẩm", href: "/san-pham" },
  { title: "Cho thuê máy", href: "/cho-thue-may" },
  { title: "Dự án", href: "/du-an" },
  { title: "Kiến thức", href: "/kien-thuc" },
  { title: "Liên hệ", href: "/lien-he" },
]

/**
 * Product categories (menus, homepage, sidebar, sitemap).
 * Typed as the entity's read model so this list can be swapped for a DB query
 * (TODO: Admin-managed categories) without touching the components.
 */
export const productCategories: CategorySummary[] = [
  {
    slug: "may-ep-bun-khung-ban",
    name: "Máy ép bùn khung bản",
    description: "Độ khô bùn cao, phù hợp bùn công nghiệp, vận hành theo mẻ.",
  },
  {
    slug: "may-ep-bun-bang-tai",
    name: "Máy ép bùn băng tải",
    description: "Vận hành liên tục, công suất lớn cho trạm xử lý tập trung.",
  },
  {
    slug: "may-ep-bun-truc-vit",
    name: "Máy ép bùn trục vít",
    description: "Nhỏ gọn, ít tiêu hao nước rửa, tự động hoàn toàn.",
  },
  {
    slug: "bon-pha-hoa-chat",
    name: "Bồn pha hóa chất",
    description: "Pha polymer, PAC định lượng cho máy ép bùn.",
  },
  {
    slug: "bom-bun",
    name: "Bơm bùn",
    description: "Bơm trục vít, bơm màng cấp bùn ổn định.",
  },
  {
    slug: "vai-loc-tam-loc",
    name: "Vải lọc, tấm lọc",
    description: "Vải lọc, tấm lọc thay thế đủ kích thước.",
  },
  {
    slug: "phu-tung-thay-the",
    name: "Phụ tùng thay thế",
    description: "Linh kiện chính hãng, có sẵn kho.",
  },
]

/** The same categories as nav links (header dropdown, mobile menu, footer, sidebar). */
export const productCategoryNav: NavItem[] = productCategories.map((category) => ({
  title: category.name,
  href: routes.category(category.slug),
  description: category.description,
}))

export function getProductCategory(slug: string) {
  return productCategories.find((category) => category.slug === slug)
}

export const footerNav = {
  support: [
    { title: "Cho thuê máy", href: "/cho-thue-may" },
    { title: "Dự án đã thực hiện", href: "/du-an" },
    { title: "Kiến thức", href: "/kien-thuc" },
    { title: "Liên hệ", href: "/lien-he" },
  ],
  policies: [
    { title: "Chính sách bảo hành", href: "/chinh-sach-bao-hanh" },
    { title: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
  ],
} satisfies Record<string, NavItem[]>
