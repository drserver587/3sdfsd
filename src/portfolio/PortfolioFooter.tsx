import { Link } from "react-router"
import { contactEmail, portfolioNav } from "@/content/site"

export default function PortfolioFooter() {
  return (
    <footer className="border-t border-[#1c1c1c] px-5 py-14 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-3">
        <div>
          <Link to="/" className="font-display text-lg font-bold text-white">
            Rinayra
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#b7b1a8]">
            Custom workflow automation and websites for small businesses. We listen before we build.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a867c]">Portfolio</p>
          <ul className="mt-4 space-y-2">
            {portfolioNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-[#b7b1a8] transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/" className="text-sm text-[#b7b1a8] transition-colors hover:text-white">
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a867c]">Contact</p>
          <a href={`mailto:${contactEmail}`} className="mt-4 block text-sm text-[#f0ede8] transition-colors hover:text-[#c8f04d]">
            {contactEmail}
          </a>
          <p className="mt-2 text-sm text-[#8a867c]">India studio. Working sessions on US hours.</p>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-[#1c1c1c] pt-6 text-xs text-[#8a867c] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Rinayra Solutions.</p>
        <p>You keep your data.</p>
      </div>
    </footer>
  )
}
