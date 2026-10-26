import { useCallback, useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type Lenis from "lenis"
import { useLenis } from "lenis/react"
import { methodSteps } from "@/content/site"
import {
  BOXES,
  CHAOS_ITEMS,
  FLOW,
  STEP_PROGRESS,
  boxAt,
  itemAt,
  itemSize,
  segment,
  stepIndex,
  type BoxId,
} from "./chaosData"
import Scrap from "./Scraps"

gsap.registerPlugin(ScrollTrigger)

export default function ChaosScene() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | undefined>(undefined)
  const onLenisScroll = useCallback(() => {
    ScrollTrigger.update()
  }, [])
  const lenis = useLenis(onLenisScroll, [])

  useLayoutEffect(() => {
    lenisRef.current = lenis
  }, [lenis])

  useLayoutEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) return

    const media = gsap.matchMedia()

    const mount = (desktop: boolean) => {
      const itemEls = Array.from(stage.querySelectorAll<HTMLElement>("[data-item]"))
      const boxEls = new Map(
        Array.from(stage.querySelectorAll<HTMLElement>("[data-box]")).map((element) => [element.dataset.box as BoxId, element]),
      )
      const connectors = Array.from(stage.querySelectorAll<SVGLineElement>("[data-connector]"))
      const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-step]"))
        const progressBar = stage.querySelector<HTMLElement>("[data-progress]")
        const svg = stage.querySelector("svg")
      const trial = stage.querySelector<HTMLElement>("[data-trial]")
      const choice = stage.querySelector<HTMLElement>("[data-choice]")

      itemEls.forEach((element) => {
        const show = desktop || element.dataset.mobile === "yes"
        element.style.display = show ? "block" : "none"
        gsap.set(element, { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" })
      })

      const render = (progress: number) => {
        const rect = stage.getBoundingClientRect()
        if (rect.width < 40 || rect.height < 40) return
        const size = { width: rect.width, height: rect.height }
        const current = stepIndex(progress)

        buttons.forEach((button, index) => {
          const active = index === current
          button.classList.toggle("is-current", active)
          if (active) button.setAttribute("aria-current", "step")
          else button.removeAttribute("aria-current")
        })

        if (progressBar) progressBar.style.transform = `scaleX(${progress})`

        for (const element of itemEls) {
          if (element.style.display === "none") continue
          const item = CHAOS_ITEMS.find((entry) => entry.id === element.dataset.item)
          if (!item) continue
          const pose = itemAt(item, progress, size, desktop)
          const dimensions = itemSize(item.kind, desktop)
          element.style.width = `${dimensions.w}px`
          element.style.height = `${dimensions.h}px`
          element.style.transform = `translate(${pose.x}px, ${pose.y}px) translate(-50%, -50%) rotate(${pose.r}deg) scale(${pose.s})`
          element.style.setProperty("--glow", pose.glow.toFixed(3))
        }

        const frames = FLOW.map((id) => ({ id, frame: boxAt(id, progress, size, desktop) }))
        for (const { id, frame } of frames) {
          const element = boxEls.get(id)
          if (!element) continue
          element.style.opacity = String(frame.opacity)
          element.style.transform = `translate(${frame.x}px, ${frame.y}px)`
          element.style.width = `${frame.w}px`
          element.style.height = `${frame.h}px`
        }

        if (svg) svg.setAttribute("viewBox", `0 0 ${size.width} ${size.height}`)
        const lineAmount = segment(progress, 0.66, 0.8)
        connectors.forEach((line, index) => {
          const from = frames[index]?.frame
          const to = frames[index + 1]?.frame
          if (!from || !to) return
          const x1 = desktop ? from.x + from.w : from.x + from.w / 2
          const y1 = desktop ? from.y + from.h / 2 : from.y + from.h
          const x2 = desktop ? to.x : to.x + to.w / 2
          const y2 = desktop ? to.y + to.h / 2 : to.y
          line.setAttribute("x1", String(x1))
          line.setAttribute("y1", String(y1))
          line.setAttribute("x2", String(x2))
          line.setAttribute("y2", String(y2))
          const length = Math.hypot(x2 - x1, y2 - y1)
          line.style.strokeDasharray = `${length}`
          line.style.strokeDashoffset = `${length * (1 - lineAmount)}`
          line.style.opacity = lineAmount > 0.02 ? "1" : "0"
        })

        if (trial) trial.style.opacity = String(segment(progress, 0.74, 0.84) * (1 - segment(progress, 0.9, 0.98)))
        if (choice) choice.style.opacity = String(segment(progress, 0.88, 0.98))
      }

      const trigger = ScrollTrigger.create({
        id: "method-story",
        trigger: root,
        start: "top top",
        end: desktop ? "+=400%" : "+=230%",
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      })

      const cleanups = buttons.map((button, index) => {
        const onClick = () => {
          const next = trigger.start + (trigger.end - trigger.start) * (STEP_PROGRESS[index] ?? 0)
          const scroller = lenisRef.current
          if (scroller) scroller.scrollTo(next, { duration: 1.05 })
          else window.scrollTo({ top: next, behavior: "smooth" })
        }
        button.addEventListener("click", onClick)
        return () => button.removeEventListener("click", onClick)
      })

      render(trigger.progress)
      root.dataset.ready = "true"

      return () => {
        trigger.kill()
        cleanups.forEach((cleanup) => cleanup())
      }
    }

    media.add("(min-width: 900px)", () => mount(true))
    media.add("(max-width: 899px)", () => mount(false))

    const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      window.cancelAnimationFrame(refresh)
      media.revert()
      delete root.dataset.ready
    }
  }, [])

  return (
    <section ref={rootRef} className="chaos-root relative h-[100svh]" aria-label="How a messy day becomes a system">
      <div className="flex h-full flex-col px-4 pb-4 pt-24 md:px-8 md:pb-6 lg:flex-row lg:gap-8 lg:px-10">
        <div className="lg:flex lg:w-[340px] lg:flex-col lg:justify-center">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#c8f04d]">Scroll</p>
          <ol className="mt-3 space-y-1 lg:mt-6 lg:space-y-3">
            {methodSteps.map((step, index) => (
              <li key={step.id}>
                <button type="button" data-step={index} className="method-step w-full text-left">
                  <span className="font-display text-[11px] text-[#c8f04d]">{step.num}</span>
                  <span className="mt-1 block font-serif text-lg leading-tight lg:text-[1.65rem]">{step.title}</span>
                </button>
                <p className="method-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div ref={stageRef} className="relative mt-3 min-h-0 flex-1 overflow-hidden border border-white/10 lg:mt-0">
          <div data-progress className="absolute left-0 top-0 z-10 h-px w-full origin-left scale-x-0 bg-[#c8f04d]" />
          <svg className="pointer-events-none absolute inset-0 z-[2] h-full w-full" aria-hidden="true">
            {FLOW.slice(0, -1).map((id) => (
              <line key={id} data-connector stroke="#c8f04d" strokeWidth="1.5" opacity="0" />
            ))}
          </svg>
          {FLOW.map((id) => (
            <div key={id} data-box={id} className="chaos-box">
              <span>{BOXES[id].label}</span>
            </div>
          ))}
          {CHAOS_ITEMS.map((item) => (
            <div key={item.id} data-item={item.id} data-mobile={item.mobile ? "yes" : "no"} className="chaos-item">
              <Scrap kind={item.kind} label={item.label} />
            </div>
          ))}
          <div data-trial className="chaos-band" aria-hidden="true">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#c8f04d]">Free trial</p>
            <p className="mt-1 text-sm text-[#f0ede8]">It runs in the real day. No fee yet.</p>
          </div>
          <div data-choice className="chaos-band" aria-hidden="true">
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-[#c8f04d] bg-[#080808]/90 px-3 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#c8f04d]">Keep it</p>
                <p className="mt-1 text-sm">Monthly, only if it helps</p>
              </div>
              <div className="border border-white/25 bg-[#080808]/90 px-3 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#d5d0c8]">Switch it off</p>
                <p className="mt-1 text-sm">You keep your data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
