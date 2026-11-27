import type { CSSProperties } from "react"

/**
 * Stagger delay for items in a revealed list/grid:
 *   <li data-reveal style={revealDelay(index)}>
 * Capped so long lists don't keep the last items waiting.
 */
export function revealDelay(index: number, stepMs = 90, maxMs = 450): CSSProperties {
  return { "--reveal-delay": `${Math.min(index * stepMs, maxMs)}ms` } as CSSProperties
}
