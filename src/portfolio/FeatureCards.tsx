import { useEffect, useRef, type PointerEvent } from "react"
import { Link } from "react-router"
import { featureCards } from "@/content/site"
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"
import { useCoarsePointer } from "@/hooks/useCoarsePointer"
import { FeatureArt } from "./illustrations"
import { warm } from "./prefetch"
import Reveal from "./Reveal"

function useTouchInView<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !enabled || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => {
        node.classList.toggle("is-inview", Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.55))
      },
      { threshold: [0.2, 0.55, 0.8] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled])

  return ref
}

function FeatureCard({
  card,
  index,
}: {
  card: (typeof featureCards)[number]
  index: number
}) {
  const coarse = useCoarsePointer()
  const reduced = usePrefersReducedMotion()
  const ref = useTouchInView<HTMLAnchorElement>(coarse)

  function onEnter(event: PointerEvent<HTMLAnchorElement>) {
    warm(card.href)
    if (reduced || event.pointerType === "touch") return
    event.currentTarget.classList.add("is-hot")
  }

  function onMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType === "touch") return
    const cardEl = event.currentTarget
    cardEl.classList.add("is-hot")
    const bounds = cardEl.getBoundingClientRect()
    const px = (event.clientX - bounds.left) / bounds.width - 0.5
    const py = (event.clientY - bounds.top) / bounds.height - 0.5
    cardEl.style.transform = `translateY(-20px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) scale(1.03)`
  }

  function onLeave(event: PointerEvent<HTMLAnchorElement>) {
    event.currentTarget.classList.remove("is-hot")
    event.currentTarget.style.transform = ""
  }

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <Link
        ref={ref}
        to={card.href}
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onPointerCancel={onLeave}
        className="feature-card group relative block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8f04d]"
      >
        <span className="feature-card-plate" aria-hidden="true" />
        <span className="feature-card-face flex h-full flex-col">
          <span className="feature-art block overflow-hidden">
            <FeatureArt art={card.art} className="h-full w-full object-cover" />
          </span>
          <span className="flex flex-1 flex-col px-6 py-6 lg:px-7 lg:py-7">
            <span className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#b7b1a8]">
              <span>{card.kicker}</span>
              <span className="font-display text-[#c8f04d]">{card.num}</span>
            </span>
            <span className="mt-4 font-serif text-4xl leading-none text-[#f0ede8]">{card.title}</span>
            <span className="mt-4 flex-1 text-sm leading-relaxed text-[#d5d0c8]">{card.body}</span>
            <span className="mt-6 text-sm text-[#c8f04d]">View</span>
          </span>
        </span>
      </Link>
    </Reveal>
  )
}

export default function FeatureCards() {
  return (
    <section className="px-5 py-24 lg:px-10 lg:py-32" aria-labelledby="doors-heading">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">The work</p>
          <h2 id="doors-heading" className="mt-4 max-w-xl font-serif text-5xl leading-[0.95] text-[#f0ede8] lg:text-6xl">
            Three doors into the studio.
          </h2>
        </Reveal>
        <div className="feature-stage mt-14 grid gap-10 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {featureCards.map((card, index) => (
            <FeatureCard key={card.href} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
