export type FaqItem = {
  question: string
  answer: string
}

/** Short portfolio FAQ. Pricing stays custom. Do not add numbers here that were not agreed. */
export const portfolioFaq: FaqItem[] = [
  {
    question: "How does pricing work?",
    answer:
      "It is custom for each solution. There is no upfront build fee and no rate card, because the work is not a package. After a free trial you pay a monthly fee only if the tool is helping. We agree that number with you before the trial ends. If it is not helping, there is no invoice.",
  },
  {
    question: "Can you work on US hours?",
    answer:
      "We are based in India. Calls and working sessions are booked in your timezone, inside US business hours. On the first conversation we lock a window that is actually convenient for your team and we hold it. Messages get a personal reply within 24 hours.",
  },
  {
    question: "How do you handle our data, and will you sign an NDA?",
    answer:
      "Yes, we will sign an NDA. Your records stay yours. Where we can, the tool lives inside the systems you already use, and turning it off does not lock you out of your data. We will not claim a certification we do not hold. Ask what is in place for your specific setup and we will answer plainly.",
  },
  {
    question: "What happens after the trial?",
    answer:
      "You use the system on real work. If it helps, a monthly fee starts and we keep improving it with you. If it does not, a kill switch turns it off. You keep your data either way. There is no leftover invoice for the build.",
  },
]
