import { Link } from "react-router"
import useDocumentTitle from "@/hooks/useDocumentTitle"

export default function NotFoundPage() {
  useDocumentTitle("Not found — Rinayra")
  return (
    <div className="grid min-h-screen place-items-center bg-[#080808] px-6 text-[#f0ede8]">
      <div className="max-w-lg">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">404</p>
        <h1 className="mt-4 font-serif text-5xl">This page is not on the site.</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#d5d0c8]">The home page and the portfolio are both still here.</p>
        <div className="mt-8 flex gap-6 text-sm">
          <Link to="/" className="text-[#c8f04d] underline-offset-4 hover:underline">
            Home
          </Link>
          <Link to="/work" className="text-[#c8f04d] underline-offset-4 hover:underline">
            Work
          </Link>
        </div>
      </div>
    </div>
  )
}
