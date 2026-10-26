import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router"
import { portfolioNav } from "@/content/site"

import { warm } from "./prefetch"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8f04d] ${
    isActive ? "text-white" : "text-[#b7b1a8] hover:text-white"
  }`

export default function PortfolioNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? "border-b border-[#222] bg-[#080808]/92 backdrop-blur" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5 text-white" onClick={() => setOpen(false)}>
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#c8f04d]">
            <img
              src="/rinayra-mark.png"
              alt=""
              width={128}
              height={128}
              className="h-full w-full object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Rinayra</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Portfolio">
          {portfolioNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
              onMouseEnter={() => warm(item.to)}
              onFocus={() => warm(item.to)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/#contact" className="text-sm text-[#b7b1a8] transition-colors hover:text-white">
            Contact
          </Link>
        </nav>

        <Link
          to="/#contact"
          className="hidden rounded-full bg-[#c8f04d] px-5 py-2.5 text-sm font-semibold text-[#080808] transition-colors hover:bg-white md:inline-flex"
        >
          Let&apos;s talk
        </Link>

        <button
          type="button"
          className="p-2 text-white md:hidden"
          aria-expanded={open}
          aria-controls="portfolio-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav id="portfolio-menu" className="flex flex-col gap-4 border-t border-[#222] bg-[#111] px-6 py-5 md:hidden" aria-label="Portfolio">
          {portfolioNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
              onClick={() => setOpen(false)}
              onFocus={() => warm(item.to)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/#contact" className="text-sm text-[#b7b1a8]" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      ) : null}
    </header>
  )
}
