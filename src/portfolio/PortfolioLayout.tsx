import { Suspense, useEffect } from "react"
import { Outlet, useLocation } from "react-router"
import { ReactLenis, useLenis } from "lenis/react"
import type { LenisOptions } from "lenis"
import "lenis/dist/lenis.css"
import PortfolioNav from "./PortfolioNav"
import PortfolioFooter from "./PortfolioFooter"

const lenisOptions = {
  autoRaf: true,
  lerp: 0.085,
  smoothWheel: true,
  syncTouch: false,
  anchors: false,
  stopInertiaOnNavigate: true,
} satisfies LenisOptions

function scrollKey(pathname: string) {
  const parts = pathname.split("/").filter(Boolean)
  if (parts[0] === "work" && (parts[1] === "case-studies" || parts[1] === "demos")) {
    return `/work/${parts[1]}`
  }
  return pathname
}

function ScrollOnPageChange() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  const key = scrollKey(pathname)

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [key, lenis])

  return null
}

function PageFallback() {
  return (
    <div className="px-5 pb-24 pt-32 lg:px-10" aria-busy="true" aria-live="polite">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a867c]">Loading</p>
    </div>
  )
}

export default function PortfolioLayout() {
  useEffect(() => {
    document.documentElement.classList.add("portfolio-scroll")
    return () => document.documentElement.classList.remove("portfolio-scroll")
  }, [])

  return (
    <ReactLenis root options={lenisOptions}>
      <div className="portfolio-root min-h-screen bg-[#080808] text-[#f0ede8]">
        <a
          href="#portfolio-main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-[#c8f04d] focus:px-4 focus:py-2 focus:text-[#080808]"
        >
          Skip to content
        </a>
        <ScrollOnPageChange />
        <PortfolioNav />
        <main id="portfolio-main">
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <PortfolioFooter />
      </div>
    </ReactLenis>
  )
}
