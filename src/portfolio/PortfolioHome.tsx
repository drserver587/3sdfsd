import { portfolioHero } from "@/content/site"
import useDocumentTitle from "@/hooks/useDocumentTitle"
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"
import { motion } from "motion/react"
import BookingButton, { PrimaryLink } from "./Buttons"
import ContactCta from "./ContactCta"
import FeatureCards from "./FeatureCards"
import PortfolioFaq from "./PortfolioFaq"
import WhoWeHelp from "./WhoWeHelp"
import WhyRinayra from "./WhyRinayra"

export default function PortfolioHome() {
  useDocumentTitle("Work — Rinayra Solutions")
  const reduced = usePrefersReducedMotion()

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-32 lg:px-10 lg:pb-14 lg:pt-36">
        <div className="mx-auto grid w-full max-w-7xl flex-1 items-end gap-12 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-8"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#c8f04d]">{portfolioHero.kicker}</p>
            <h1 className="mt-6 max-w-full font-serif text-[clamp(2.35rem,11vw,7.4rem)] leading-[0.92] tracking-[-0.03em] text-[#f0ede8]">
              {portfolioHero.titleLead}
              <span className="mt-1 block italic text-[#efeae0]">{portfolioHero.titleAccent}</span>
            </h1>
          </motion.div>
          <motion.div
            className="flex flex-col items-start gap-8 lg:col-span-4 lg:pb-3"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduced ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-md text-base leading-relaxed text-[#d5d0c8]">{portfolioHero.deck}</p>
            <div className="flex flex-col items-start gap-5">
              <PrimaryLink href={portfolioHero.primaryHref}>{portfolioHero.primaryCta}</PrimaryLink>
              <BookingButton />
            </div>
          </motion.div>
        </div>
        <dl className="mx-auto mt-16 grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-5 border-t border-[#222] pt-6 lg:grid-cols-4">
          {portfolioHero.facts.map((fact, index) => (
            <div key={fact}>
              <dt className="font-display text-[11px] text-[#c8f04d]">0{index + 1}</dt>
              <dd className="mt-2 text-sm text-[#d5d0c8]">{fact}</dd>
            </div>
          ))}
        </dl>
      </section>
      <FeatureCards />
      <WhoWeHelp />
      <WhyRinayra />
      <PortfolioFaq />
      <ContactCta />
    </>
  )
}
