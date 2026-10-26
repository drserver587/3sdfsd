import type { BookPage } from "@/content/types"
import { assertNever } from "@/content/types"

function isPlaceholder(value: string) {
  return value.includes("[")
}

export default function BookPageView({ page, index, total }: { page: BookPage; index: number; total: number }) {
  const number = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`

  switch (page.kind) {
    case "cover":
      return (
        <article className="flex h-full flex-col bg-[#141414] px-7 py-8 text-[#f4f1ea] sm:px-12 sm:py-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">{page.kicker}</p>
          <h2 className="mt-8 font-serif text-4xl leading-[1.02] sm:text-5xl">{page.title}</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#d5d0c8] sm:text-base">{page.summary}</p>
          <dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6">
            {page.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8a867c]">{item.label}</dt>
                <dd className="mt-1 text-sm text-[#f4f1ea]">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[#8a867c]">{number}</p>
        </article>
      )
    case "prose":
      return (
        <article className="book-scroll flex h-full flex-col bg-[#f4f1ea] px-7 py-8 text-[#1c1c1c] sm:px-12 sm:py-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#5c584f]">{page.kicker}</p>
          <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl">{page.title}</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#2a2a2a] sm:text-[15px]">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-auto pt-8 text-[11px] uppercase tracking-[0.16em] text-[#5c584f]">{number}</p>
        </article>
      )
    case "video":
      return (
        <article className="book-scroll flex h-full flex-col bg-[#f4f1ea] px-7 py-8 text-[#1c1c1c] sm:px-12 sm:py-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#5c584f]">{page.kicker}</p>
          <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl">{page.title}</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#2a2a2a]">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {page.videoSrc ? (
            <video
              className="mt-6 aspect-video w-full bg-black"
              controls
              preload="metadata"
              poster={page.posterSrc}
            >
              <source src={page.videoSrc} />
            </video>
          ) : (
            <div
              className="mt-6 grid aspect-video w-full place-items-center border border-dashed border-[#1c1c1c]/25 bg-[#ebe6dc] px-6 text-center"
              role="img"
              aria-label={page.videoLabel}
            >
              <div>
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#1c1c1c]/30" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M4 2.5v9l8-4.5-8-4.5z" fill="#1c1c1c" />
                  </svg>
                </span>
                <p className="mt-4 font-serif text-xl">{page.videoLabel}</p>
              </div>
            </div>
          )}
          <p className="mt-auto pt-6 text-[11px] uppercase tracking-[0.16em] text-[#5c584f]">{number}</p>
        </article>
      )
    case "results":
      return (
        <article className="book-scroll flex h-full flex-col bg-[#f4f1ea] px-7 py-8 text-[#1c1c1c] sm:px-12 sm:py-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#5c584f]">{page.kicker}</p>
          <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl">{page.title}</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#2a2a2a]">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-6 space-y-4">
            {page.metrics.map((metric) => (
              <div key={metric.label} className="border-t border-[#1c1c1c]/10 pt-3">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-[#5c584f]">{metric.label}</dt>
                <dd className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                  <span>{metric.value}</span>
                  {isPlaceholder(metric.value) ? (
                    <span className="bg-[#1c1c1c] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#c8f04d]">
                      To fill in
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-auto pt-6 text-[11px] uppercase tracking-[0.16em] text-[#5c584f]">{number}</p>
        </article>
      )
    case "back":
      return (
        <article className="flex h-full flex-col bg-[#141414] px-7 py-8 text-[#f4f1ea] sm:px-12 sm:py-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">{page.kicker}</p>
          <h2 className="mt-8 font-serif text-4xl leading-[1.02] sm:text-5xl">{page.title}</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#d5d0c8]">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href={page.ctaHref}
            className="mt-8 inline-flex w-fit items-center rounded-full bg-[#c8f04d] px-6 py-3 text-sm font-semibold text-[#080808] transition-colors hover:bg-white"
          >
            {page.ctaLabel}
          </a>
          <p className="mt-auto pt-8 text-[11px] uppercase tracking-[0.16em] text-[#8a867c]">{number}</p>
        </article>
      )
    default:
      return assertNever(page)
  }
}
