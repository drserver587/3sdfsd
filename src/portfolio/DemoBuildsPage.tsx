import { Link, useParams } from "react-router"
import { demoBuilds } from "@/content/demos"
import { assertNever, type DemoEntry, type ReadyDemo } from "@/content/types"
import useDocumentTitle from "@/hooks/useDocumentTitle"
import BookReader from "./BookReader"
import Reveal from "./Reveal"

function isReady(entry: DemoEntry): entry is ReadyDemo {
  return entry.status === "ready"
}

export default function DemoBuildsPage() {
  const { slug } = useParams()
  const ready = demoBuilds.filter(isReady)
  const active = ready.find((entry) => entry.slug === slug)
  const missing = Boolean(slug) && !active
  useDocumentTitle(active ? `${active.title} — Rinayra Solutions` : "Demo builds — Rinayra Solutions")

  return (
    <div className="px-5 pb-24 pt-32 lg:px-10 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">Demo builds</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] lg:text-7xl">Demo builds in progress.</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#d5d0c8]">
            Working prototypes will sit here and open in the same reader as the case studies. Nothing is ready to show yet. The slots below are reserved.
          </p>
        </Reveal>
        {missing ? (
          <p className="mt-8 border border-[#333] px-4 py-3 text-sm text-[#d5d0c8]" role="status">
            That demo is not published yet.
          </p>
        ) : null}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demoBuilds.map((entry) => {
            switch (entry.status) {
              case "coming-soon":
                return (
                  <article
                    key={entry.slug}
                    className="flex min-h-[420px] flex-col border border-[#222] bg-[#0c0c0c]"
                    aria-label={`${entry.title}, ${entry.note}`}
                  >
                    <div className="skeleton-shimmer min-h-52 flex-1 border-b border-[#222]" />
                    <div className="px-6 py-6">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a867c]">{entry.kicker}</p>
                      <h2 className="mt-3 font-serif text-3xl text-[#f0ede8]">{entry.title}</h2>
                      <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-[#c8f04d]">{entry.note}</p>
                    </div>
                  </article>
                )
              case "ready":
                return (
                  <Link
                    key={entry.slug}
                    to={`/work/demos/${entry.slug}`}
                    state={{ fromList: true }}
                    className="flex min-h-[420px] flex-col justify-end border border-[#222] bg-[#0c0c0c] p-6 transition-colors hover:border-[#c8f04d]"
                  >
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#c8f04d]">
                      {entry.sector} · {entry.location}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl">{entry.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#d5d0c8]">{entry.excerpt}</p>
                  </Link>
                )
              default:
                return assertNever(entry)
            }
          })}
        </div>
      </div>
      {active ? <BookReader story={active} closeTo="/work/demos" /> : null}
    </div>
  )
}
