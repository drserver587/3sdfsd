import { reasons } from "@/content/site"
import Reveal from "./Reveal"

export default function WhyRinayra() {
  return (
    <section className="border-t border-[#1c1c1c] px-5 py-24 lg:px-10 lg:py-32" aria-labelledby="why-heading">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">Why Rinayra</p>
          <h2 id="why-heading" className="mt-4 font-serif text-5xl leading-[0.95] lg:text-6xl">
            Built around the day you already have.
          </h2>
        </Reveal>
        <div className="lg:col-span-8">
          <ol>
            {reasons.map((reason) => (
              <Reveal key={reason.num}>
                <li className="grid gap-3 border-t border-[#222] py-7 sm:grid-cols-12 sm:gap-6">
                  <span className="font-display text-xs text-[#c8f04d] sm:col-span-2">{reason.num}</span>
                  <h3 className="font-serif text-2xl sm:col-span-4">{reason.title}</h3>
                  <p className="text-sm leading-relaxed text-[#d5d0c8] sm:col-span-6">{reason.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
