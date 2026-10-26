import { audiences } from "@/content/site"
import Reveal from "./Reveal"

export default function WhoWeHelp() {
  return (
    <section className="border-t border-[#1c1c1c] px-5 py-24 lg:px-10 lg:py-32" aria-labelledby="who-heading">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">Who we help</p>
          <h2 id="who-heading" className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] lg:text-6xl">
            US small businesses with a repeatable, messy day.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#d5d0c8]">
            The published case studies are engagements in India. The same method is what we bring to small teams in the United States. These are the days we are set up to sit with. They are not a client list.
          </p>
        </Reveal>
        <div className="mt-14 grid border border-[#222] sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04} className="border-[#222] sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0">
              <article className="h-full border-b border-[#222] p-8 lg:p-10">
                <p className="font-display text-xs text-[#c8f04d]">0{index + 1}</p>
                <h3 className="mt-5 font-serif text-3xl leading-tight">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#d5d0c8]">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
