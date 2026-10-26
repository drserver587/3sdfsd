import { useEffect, useRef, type PointerEvent } from "react"
import { Link } from "react-router"
import type { CaseStudy } from "@/content/types"
import { useCoarsePointer } from "@/hooks/useCoarsePointer"
import { CaseArt } from "./illustrations"

export default function ArticleCard({ study, reverse }: { study: CaseStudy; reverse: boolean }) {
  const coarse = useCoarsePointer()
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !coarse || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => {
        node.classList.toggle("is-inview", Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.45))
      },
      { threshold: [0.2, 0.45, 0.75] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [coarse])

  return (
    <Link
      ref={ref}
      to={`/work/case-studies/${study.slug}`}
      state={{ fromList: true }}
      className="article-card group grid border border-[#222] bg-[#0c0c0c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8f04d] md:grid-cols-2"
      onPointerEnter={(event: PointerEvent<HTMLAnchorElement>) => {
        if (event.pointerType === "touch") return
        event.currentTarget.classList.add("is-hot")
      }}
      onPointerLeave={(event: PointerEvent<HTMLAnchorElement>) => {
        event.currentTarget.classList.remove("is-hot")
      }}
    >
      <div className={`article-art min-h-64 overflow-hidden ${reverse ? "md:order-2" : ""}`}>
        <CaseArt visual={study.visual} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#c8f04d]">
          {study.sector}
          <span className="text-[#8a867c]"> · {study.location}</span>
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-[#f0ede8]">{study.title}</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#d5d0c8]">{study.excerpt}</p>
        <p className="mt-8 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#b7b1a8]">
          <span>{study.client}</span>
          <span className={study.status === "In progress" ? "text-[#c8f04d]" : ""}>{study.status}</span>
        </p>
      </div>
    </Link>
  )
}
