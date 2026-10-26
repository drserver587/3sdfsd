import useDocumentTitle from "@/hooks/useDocumentTitle"
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"
import ChaosScene from "./ChaosScene"
import ContactCta from "./ContactCta"
import MethodStatic from "./MethodStatic"
import Reveal from "./Reveal"

export default function HowWeWorkPage() {
  useDocumentTitle("How we work — Rinayra Solutions")
  const reduced = usePrefersReducedMotion()

  return (
    <div className="pt-28 lg:pt-32">
      <Reveal className="px-5 pb-10 lg:px-10 lg:pb-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">How we work</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] lg:text-7xl">A messy day, pulled into a system.</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#d5d0c8]">
            Invoices, chats, calls, half-finished sheets. We watch that day, sort it, and connect it into something you can try. Keep it only if it helps.
          </p>
        </div>
      </Reveal>
      {reduced ? <MethodStatic /> : <ChaosScene />}
      <ContactCta />
    </div>
  )
}
