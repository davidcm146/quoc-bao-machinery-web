import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

/**
 * Default Open Graph / Zalo / Facebook share image (1200×630) for every page
 * that doesn't define its own. Product & article pages should add their own
 * `opengraph-image` or pass `images` to createMetadata().
 */
export const alt = `${siteConfig.name} – ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

async function loadFont(weight: 400 | 700) {
  // Be Vietnam Pro from Google Fonts so Vietnamese diacritics render correctly.
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@${weight}&display=swap`
  ).then((res) => res.text())
  const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!src) return null
  return fetch(src).then((res) => res.arrayBuffer())
}

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([loadFont(400), loadFont(700)]).catch(() => [null, null])

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #0f3d22 0%, #15803d 100%)",
        color: "white",
        fontFamily: "Be Vietnam Pro",
      }}
    >
      <div style={{ display: "flex", fontSize: 32, fontWeight: 700, opacity: 0.9 }}>{siteConfig.name}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.15 }}>{siteConfig.tagline}</div>
        <div style={{ fontSize: 30, opacity: 0.85 }}>Bán · Cho thuê · Lắp đặt · Bảo hành toàn quốc</div>
      </div>
      <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
        Hotline: {siteConfig.contact.hotline}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        ...(regular ? [{ name: "Be Vietnam Pro", data: regular, weight: 400 as const }] : []),
        ...(bold ? [{ name: "Be Vietnam Pro", data: bold, weight: 700 as const }] : []),
      ],
    }
  )
}
