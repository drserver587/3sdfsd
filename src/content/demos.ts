import type { DemoEntry } from "./types"

/**
 * Demo builds for /work/demos.
 *
 * Coming-soon entries render as labeled skeleton slots.
 * To publish a demo, add a `status: "ready"` object (or change a slot)
 * with `pages` using the same BookPage sequence as a case study.
 * A ready demo opens in the book reader at /work/demos/:slug.
 *
 * TODO: replace these slots when a demo is ready to show.
 */
export const demoBuilds: DemoEntry[] = [
  {
    status: "coming-soon",
    slug: "demo-01",
    kicker: "Slot 01",
    title: "Demo build",
    note: "Coming soon",
  },
  {
    status: "coming-soon",
    slug: "demo-02",
    kicker: "Slot 02",
    title: "Demo build",
    note: "Coming soon",
  },
  {
    status: "coming-soon",
    slug: "demo-03",
    kicker: "Slot 03",
    title: "Demo build",
    note: "Coming soon",
  },
]
