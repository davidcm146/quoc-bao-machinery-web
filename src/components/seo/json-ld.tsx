/**
 * Renders Schema.org structured data. Build the payload with the typed helpers
 * in `@/lib/seo` (schema-dts). `<` is escaped so content coming from the CMS
 * can never close the script tag early.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
