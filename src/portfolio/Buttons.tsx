import { useId, type ReactNode } from "react"
import { Link } from "react-router"
import { bookingUrl } from "@/content/site"

const primaryClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#c8f04d] px-6 py-3 text-sm font-semibold text-[#080808] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#080808]"

const quietClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#3a3a3a] px-6 py-3 text-sm text-[#f0ede8] transition-colors hover:border-[#c8f04d] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8f04d]"

export function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={primaryClass}>
        {children}
        <ArrowIcon />
      </Link>
    )
  }
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      className={primaryClass}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      <ArrowIcon />
    </a>
  )
}

export function QuietLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={quietClass}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={quietClass}>
      {children}
    </a>
  )
}

export default function BookingButton({ prominent = false }: { prominent?: boolean }) {
  const descriptionId = useId()
  const className = prominent ? primaryClass : quietClass

  if (bookingUrl) {
    return (
      <a href={bookingUrl} className={className}>
        Book a call
        <ArrowIcon />
      </a>
    )
  }

  return (
    <span className="inline-flex flex-col items-start gap-2">
      <button type="button" className={`${className} cursor-not-allowed`} disabled aria-describedby={descriptionId}>
        Book a call
      </button>
      <span id={descriptionId} className="text-[11px] uppercase tracking-[0.16em] text-[#c8f04d]">
        TODO: add booking link
      </span>
    </span>
  )
}
