"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

/**
 * One IntersectionObserver for the whole page: adds `.is-revealed` to every
 * `[data-reveal]` element the first time it scrolls into view. Re-scans on
 * client-side navigation. Sections stay Server Components – they only need the
 * `data-reveal` attribute.
 */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)")

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-revealed"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("is-revealed")
          observer.unobserve(entry.target)
        }
      },
      // Trigger slightly before the element is fully on screen
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
