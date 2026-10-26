import { useId, useState } from "react"
import { portfolioFaq } from "@/content/faq"
import Reveal from "./Reveal"

export default function PortfolioFaq() {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section className="border-t border-[#1c1c1c] px-5 py-24 lg:px-10 lg:py-32" aria-labelledby="portfolio-faq-heading">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">FAQ</p>
          <h2 id="portfolio-faq-heading" className="mt-4 font-serif text-5xl leading-[0.95]">
            Before the first call.
          </h2>
        </Reveal>
        <div className="lg:col-span-8">
          {portfolioFaq.map((item, index) => {
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`
            const expanded = open === index
            return (
              <div key={item.question} className="border-b border-[#222]">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    <span className="text-base text-[#f0ede8]">{item.question}</span>
                    <span
                      className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border transition-colors ${
                        expanded ? "border-[#c8f04d] bg-[#c8f04d] text-[#080808]" : "border-[#333] text-[#d5d0c8]"
                      }`}
                      aria-hidden="true"
                    >
                      {expanded ? "–" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded} className="pb-6 pr-12 text-sm leading-relaxed text-[#d5d0c8]">
                  {item.answer}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
