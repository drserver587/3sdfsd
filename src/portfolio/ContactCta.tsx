import { contactEmail } from "@/content/site"
import BookingButton, { PrimaryLink, QuietLink } from "./Buttons"
import Reveal from "./Reveal"

export default function ContactCta() {
  return (
    <section className="border-t border-[#1c1c1c] px-5 py-24 lg:px-10 lg:py-32" aria-labelledby="contact-cta-heading">
      <Reveal className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">Contact</p>
        <h2 id="contact-cta-heading" className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] lg:text-7xl">
          Tell us about the day.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#d5d0c8]">
          A conversation, not a deck. Write to {contactEmail} or use the form on the main site. We reply within 24 hours.
        </p>
        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center">
          <PrimaryLink href={`mailto:${contactEmail}`}>Email {contactEmail}</PrimaryLink>
          <QuietLink href="/#contact">Use the form</QuietLink>
          <BookingButton />
        </div>
      </Reveal>
    </section>
  )
}
