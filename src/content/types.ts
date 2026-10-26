export type BookPage =
  | {
      kind: "cover"
      kicker: string
      title: string
      summary: string
      meta: { label: string; value: string }[]
    }
  | {
      kind: "prose"
      kicker: string
      title: string
      paragraphs: string[]
    }
  | {
      kind: "video"
      kicker: string
      title: string
      paragraphs: string[]
      /** Shown in the empty frame until a file is added. */
      videoLabel: string
      /**
       * TODO: set this to a hosted walkthrough (mp4/webm).
       * Leave unset to keep the "coming soon" frame.
       */
      videoSrc?: string
      posterSrc?: string
    }
  | {
      kind: "results"
      kicker: string
      title: string
      paragraphs: string[]
      /**
       * TODO: replace bracketed values with confirmed numbers.
       * Anything containing "[" is rendered as a placeholder.
       */
      metrics: { label: string; value: string }[]
    }
  | {
      kind: "back"
      kicker: string
      title: string
      paragraphs: string[]
      ctaLabel: string
      ctaHref: string
    }

export type CaseStatus = "Shipped" | "In progress"

export type CaseVisual = "wholesale" | "reels" | "skincare"

export type CaseStudy = {
  slug: string
  title: string
  excerpt: string
  client: string
  location: string
  sector: string
  status: CaseStatus
  visual: CaseVisual
  pages: BookPage[]
}

export type ComingSoonDemo = {
  status: "coming-soon"
  slug: string
  kicker: string
  title: string
  note: string
}

export type ReadyDemo = {
  status: "ready"
  slug: string
  title: string
  excerpt: string
  sector: string
  location: string
  pages: BookPage[]
}

export type DemoEntry = ComingSoonDemo | ReadyDemo

export function assertNever(value: never): never {
  throw new Error(`Unhandled variant: ${JSON.stringify(value)}`)
}
