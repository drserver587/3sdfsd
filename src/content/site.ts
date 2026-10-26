/** Portfolio copy. Edit this file to change headlines, audiences, and the method. */

/**
 * TODO: set this to the real booking URL (Calendly or similar).
 * While it is null, booking controls render as a disabled placeholder.
 */
export const bookingUrl: string | null = null

export const contactEmail = "hello@rinayra.org"

export const portfolioHero = {
  kicker: "Rinayra Solutions",
  titleLead: "Remove the friction",
  titleAccent: "from the workday.",
  deck: "We watch how a small business actually runs, find the snag, and build a custom system around it. Try it free. Pay monthly only if it helps. If it does not, it switches off, and you keep your data.",
  primaryCta: "Start a conversation",
  primaryHref: `mailto:${contactEmail}`,
  facts: [
    "India-based studio",
    "Now for US small businesses",
    "Free trial before any fee",
    "You always keep your data",
  ],
}

export const featureCards = [
  {
    num: "01",
    title: "Case studies",
    href: "/work/case-studies",
    kicker: "Three engagements",
    body: "Real work in India, told without invented numbers or borrowed logos. Clients stay unnamed.",
    art: "studies" as const,
  },
  {
    num: "02",
    title: "How we work",
    href: "/work/how-we-work",
    kicker: "From mess to system",
    body: "A day arrives in pieces. We sort it, connect it, and leave you with a switch.",
    art: "method" as const,
  },
  {
    num: "03",
    title: "Demo builds",
    href: "/work/demos",
    kicker: "In the workshop",
    body: "Working prototypes will live here, in the same reader as the case studies. None are listed yet.",
    art: "demos" as const,
  },
]

export const audiences = [
  {
    title: "Distributors and wholesalers",
    body: "Invoices, stock, and the gap between what was bought and what was sold.",
  },
  {
    title: "Home services",
    body: "Scheduling, follow-ups, and the work that falls between jobs.",
  },
  {
    title: "Restaurants",
    body: "Vendors, prep, and the shift that never quite lines up on paper.",
  },
  {
    title: "Clinics",
    body: "Intake, recalls, and the paperwork around the appointment.",
  },
  {
    title: "E-commerce brands",
    body: "The site, the catalog, and the questions a buyer asks twice.",
  },
  {
    title: "Agencies",
    body: "Handoffs, reporting, and the sheet everyone maintains by hand.",
  },
]

export const reasons = [
  {
    num: "01",
    title: "Custom, not a catalog",
    body: "We do not resell a fixed product. The workflow decides what gets built.",
  },
  {
    num: "02",
    title: "A free trial, in your real day",
    body: "You use it on live work before there is a fee. That is the only honest test.",
  },
  {
    num: "03",
    title: "Monthly, only if it helps",
    body: "If you can feel the difference, we agree a monthly fee. If you cannot, it stops.",
  },
  {
    num: "04",
    title: "You keep your data",
    body: "The kill switch turns the tool off. It does not hold your records.",
  },
  {
    num: "05",
    title: "Inside the tools you have",
    body: "Google, Microsoft, QuickBooks, Excel, and the rest of the stack you already run.",
  },
]

export const methodSteps = [
  {
    id: "listen",
    num: "01",
    title: "We watch and listen to your day",
    body: "No pitch and no deck. We sit with how the work actually happens. The calls, the sheets, the invoices, the side messages.",
  },
  {
    id: "friction",
    num: "02",
    title: "We find the friction",
    body: "We name the snag that costs the day. Not every annoyance. The one a custom tool can actually remove.",
  },
  {
    id: "organize",
    num: "03",
    title: "We organize the chaos",
    body: "Scattered inputs get sorted into a shape a team can recognize. Invoices with invoices. Messages with messages. Sheets with sheets.",
  },
  {
    id: "build",
    num: "04",
    title: "We build your solution",
    body: "Those boxes connect into one flow, fitted to the tools you already use. Not a new place you have to remember to open.",
  },
  {
    id: "trial",
    num: "05",
    title: "You try it free",
    body: "It goes into your real work before any fee. We stay close for the things we only learn once it is in use.",
  },
  {
    id: "keep",
    num: "06",
    title: "Keep it only if it helps",
    body: "If it helps, you pay monthly. If it does not, a kill switch turns it off. You keep your data either way.",
  },
] as const

export const portfolioNav = [
  { label: "Work", to: "/work", end: true },
  { label: "Case studies", to: "/work/case-studies", end: false },
  { label: "How we work", to: "/work/how-we-work", end: false },
  { label: "Demos", to: "/work/demos", end: false },
]
