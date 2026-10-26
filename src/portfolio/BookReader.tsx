import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { flushSync } from "react-dom"
import { useLocation, useNavigate, useSearchParams } from "react-router"
import { useLenis } from "lenis/react"
import type { BookPage } from "@/content/types"
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"
import BookPageView from "./BookPageView"

type Story = {
  title: string
  pages: BookPage[]
}

type Turn = {
  from: number
  to: number
}

function clampPage(value: number, total: number) {
  if (!Number.isFinite(value)) return 0
  return Math.min(total - 1, Math.max(0, value))
}

export default function BookReader({ story, closeTo }: { story: Story; closeTo: string }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const reduced = usePrefersReducedMotion()
  const lenis = useLenis()
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const [turn, setTurn] = useState<Turn | null>(null)
  const total = story.pages.length
  const index = clampPage(Number(searchParams.get("p") ?? "1") - 1, total)
  const indexRef = useRef(index)
  const turnRef = useRef(turn)
  indexRef.current = index
  turnRef.current = turn
  const forward = turn ? turn.to > turn.from : true
  const topIndex = !turn ? index : forward ? turn.from : turn.to
  const underIndex = !turn ? null : forward ? turn.to : turn.from

  function commit(next: number) {
    setSearchParams(
      (previous) => {
        const params = new URLSearchParams(previous)
        if (next <= 0) params.delete("p")
        else params.set("p", String(next + 1))
        return params
      },
      { replace: true, state: location.state },
    )
  }

  function close() {
    const fromList = Boolean((location.state as { fromList?: boolean } | null)?.fromList)
    if (fromList) navigate(-1)
    else navigate(closeTo, { replace: true })
  }

  function go(next: number) {
    const current = indexRef.current
    const target = clampPage(next, total)
    if (turnRef.current || target === current) return
    if (reduced) {
      commit(target)
      return
    }
    setTurn({ from: current, to: target })
  }

  useEffect(() => {
    if (!turn || reduced) return
    const sheet = sheetRef.current
    if (!sheet) return
    const isForward = turn.to > turn.from
    sheet.style.transform = isForward ? "rotateY(0deg)" : "rotateY(-180deg)"
    const animation = sheet.animate(
      isForward
        ? [{ transform: "rotateY(0deg)" }, { transform: "rotateY(-180deg)" }]
        : [{ transform: "rotateY(-180deg)" }, { transform: "rotateY(0deg)" }],
      { duration: 980, easing: "cubic-bezier(.4, .05, .2, 1)", fill: "forwards" },
    )
    let cancelled = false
    animation.onfinish = () => {
      if (cancelled) return
      sheet.style.visibility = "hidden"
      animation.cancel()
      sheet.style.transform = ""
      flushSync(() => {
        setTurn(null)
        commit(turn.to)
      })
      sheet.style.visibility = ""
    }
    return () => {
      cancelled = true
      animation.cancel()
      sheet.style.transform = ""
      sheet.style.visibility = ""
    }
    // commit is recreated each render and only needs the latest search writer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, reduced])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    lenis?.stop()
    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null
    const focusable = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])") ?? [],
      )
    const frame = window.requestAnimationFrame(() => focusable()[0]?.focus())

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        close()
        return
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        go(indexRef.current + 1)
        return
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        go(indexRef.current - 1)
        return
      }
      if (event.key !== "Tab" || !dialog) return
      const items = focusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    window.addEventListener("keydown", onKey)
    return () => {
      window.cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      lenis?.start()
      window.removeEventListener("keydown", onKey)
      previouslyFocused?.focus()
    }
    // Keyboard handlers read the latest page through refs. Rebinding on every
    // page turn would steal focus back to the close button.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis])

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a, button")) return
    pointer.current = { x: event.clientX, y: event.clientY }
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointer.current) return
    const dx = event.clientX - pointer.current.x
    const dy = event.clientY - pointer.current.y
    pointer.current = null
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) return
    if (dx < 0) go(index + 1)
    else go(index - 1)
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-3 py-4 sm:px-8">
      <div className="absolute inset-0 bg-[#080808]/80 backdrop-blur-sm" onClick={close} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative z-10 flex w-full max-w-5xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div className="mb-3 flex w-full items-center justify-between gap-4 text-[#f0ede8]">
          <p id={titleId} className="truncate font-serif text-lg sm:text-2xl">
            {story.title}
          </p>
          <button
            type="button"
            onClick={close}
            className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-white/20 hover:border-[#c8f04d]"
          >
            <span className="sr-only">Close</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <div className="flex w-full items-center gap-2 sm:gap-4">
          <button
            type="button"
            className="hidden h-12 w-12 flex-shrink-0 place-items-center rounded-full border border-white/15 text-[#f0ede8] disabled:opacity-30 sm:grid"
            onClick={() => go(index - 1)}
            disabled={index <= 0 || Boolean(turn)}
            aria-label="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <div className="book-scene relative mx-auto aspect-[4/5] w-full max-w-[720px] sm:aspect-[5/4]">
            <div className="book-edges" aria-hidden="true" />
            {underIndex !== null ? (
              <div className="book-sheet book-sheet-under">
                <BookPageView page={story.pages[underIndex]!} index={underIndex} total={total} />
              </div>
            ) : null}
            <div ref={sheetRef} className={`book-sheet book-sheet-top ${turn ? "is-turning" : ""}`}>
              <div className="book-face book-face-front">
                <BookPageView page={story.pages[topIndex]!} index={topIndex} total={total} />
                <span className="book-curl" aria-hidden="true" />
              </div>
              <div className="book-face book-face-back" aria-hidden="true" />
            </div>
          </div>

          <button
            type="button"
            className="hidden h-12 w-12 flex-shrink-0 place-items-center rounded-full border border-white/15 text-[#f0ede8] disabled:opacity-30 sm:grid"
            onClick={() => go(index + 1)}
            disabled={index >= total - 1 || Boolean(turn)}
            aria-label="Next page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex w-full items-center justify-between gap-3 text-sm text-[#d5d0c8]">
          <button
            type="button"
            className="rounded-full border border-white/15 px-4 py-2 disabled:opacity-30 sm:hidden"
            onClick={() => go(index - 1)}
            disabled={index <= 0 || Boolean(turn)}
          >
            Previous
          </button>
          <p className="mx-auto tabular-nums" aria-live="polite">
            Page {index + 1} of {total}
            <span className="ml-3 hidden text-[#8a867c] sm:inline">Arrow keys or swipe</span>
          </p>
          <button
            type="button"
            className="rounded-full border border-white/15 px-4 py-2 disabled:opacity-30 sm:hidden"
            onClick={() => go(index + 1)}
            disabled={index >= total - 1 || Boolean(turn)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
