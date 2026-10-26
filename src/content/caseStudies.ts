import type { CaseStudy } from "./types"
import { contactEmail } from "./site"

const email = `mailto:${contactEmail}`

/**
 * Case studies. Clients are anonymized on purpose.
 * TODO: replace every value that contains "[" with a confirmed figure.
 * TODO: set videoSrc on each "video" page when the walkthrough is ready.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "wholesale-invoice-reconciliation",
    title: "Invoice and stock reconciliation",
    excerpt:
      "Purchase and sales invoices were scanned or typed by hand and reconciled in Excel. Stock would not tie out.",
    client: "Wholesale and trading business",
    location: "India",
    sector: "Wholesale",
    status: "Shipped",
    visual: "wholesale",
    pages: [
      {
        kind: "cover",
        kicker: "Case study 01",
        title: "Invoice and stock reconciliation",
        summary:
          "A wholesale and trading business was matching purchase and sales invoices by hand. The stock figure at the end of the day did not agree with the paperwork.",
        meta: [
          { label: "Client", value: "Unnamed, on purpose" },
          { label: "Trade", value: "Wholesale and trading" },
          { label: "Place", value: "India" },
          { label: "Status", value: "Shipped" },
        ],
      },
      {
        kind: "prose",
        kicker: "The client and their day",
        title: "Paper, scans, and a spreadsheet that had to be right.",
        paragraphs: [
          "The business buys goods and sells them on. Purchase invoices arrive from suppliers. Sales invoices go out to customers. Someone on the team scanned those documents or typed them, then reconciled the numbers in Excel.",
          "The same entries were supposed to explain what was still in stock. The day was a loop of receiving a document, getting it into the sheet, and hoping the totals still made sense.",
        ],
      },
      {
        kind: "prose",
        kicker: "The friction",
        title: "The books and the stock told different stories.",
        paragraphs: [
          "Entry was manual. A scan still had to be read and keyed. Reconciliation lived in a spreadsheet that was only as good as that typing.",
          "When a quantity was sold and no purchase invoice matched it, the miss was easy to leave in the sheet. Stock did not tie out. The team could not trust the number they were looking at.",
        ],
      },
      {
        kind: "prose",
        kicker: "What we built",
        title: "Scan in. Reconcile. Flag what does not match.",
        paragraphs: [
          "Rinayra built a system that scans purchase invoices and sales invoices into an Excel reconciliation. Beside that, a stock reconciliation flags sold quantities that have no matching purchase invoice.",
          "The sheet stays the place the team already works. The system does the sorting. A person still decides what a flag means.",
        ],
      },
      {
        kind: "video",
        kicker: "How it works",
        title: "From an invoice to a flagged row.",
        paragraphs: [
          "Purchase and sales invoices go in. The system reads them into the reconciliation workbook. Stock is checked against those invoices.",
          "A sold quantity with no matching purchase invoice is flagged for a person to look at. The walkthrough of that path will sit here.",
        ],
        videoLabel: "Walkthrough video coming soon",
      },
      {
        kind: "results",
        kicker: "What changed",
        title: "What we will measure with them.",
        paragraphs: [
          "We are not publishing a result we have not confirmed. The points below are the ones worth filling in with the client. Until then they stay blank on purpose.",
        ],
        metrics: [
          { label: "Time on invoice entry", value: "[X hours/week → Y]" },
          { label: "Stock lines flagged before they linger", value: "[number — to confirm]" },
          { label: "Invoices that still need a person", value: "[number — to confirm]" },
        ],
      },
      {
        kind: "back",
        kicker: "If this is your week",
        title: "Distributors live in this gap.",
        paragraphs: [
          "Invoices on one side, stock on the other, and a spreadsheet trying to be both. We will watch your version of the day before we build anything.",
        ],
        ctaLabel: "Start a conversation",
        ctaHref: email,
      },
    ],
  },
  {
    slug: "real-estate-reels-intelligence",
    title: "Property reels, turned into a sheet",
    excerpt:
      "The team watched property reels one by one to capture what was on screen. We turned that video into rows they can search.",
    client: "Real estate firm",
    location: "India",
    sector: "Real estate",
    status: "Shipped",
    visual: "reels",
    pages: [
      {
        kind: "cover",
        kicker: "Case study 02",
        title: "Property reels, turned into a sheet",
        summary:
          "A real estate firm was sitting through Instagram reels to pull out property details. The useful part was scattered across burned-in text and speech. It needed to become a row, not a pile of video.",
        meta: [
          { label: "Client", value: "Unnamed, on purpose" },
          { label: "Trade", value: "Real estate" },
          { label: "Place", value: "India" },
          { label: "Status", value: "Shipped" },
        ],
      },
      {
        kind: "prose",
        kicker: "The client and their day",
        title: "A queue of reels, and a person watching each one.",
        paragraphs: [
          "Agents and marketers posted property reels. Someone on the team played them to capture the details the firm cares about. Price, location, configuration, and whatever else that reel put on screen or said aloud.",
          "The notes did not land in one structured place. Finding a property later meant remembering which reel it was in, or watching it again.",
        ],
      },
      {
        kind: "prose",
        kicker: "The friction",
        title: "The material was video. The work needed a record.",
        paragraphs: [
          "The detail was split. Some of it was burned into the picture. Some of it was spoken. Neither was searchable once the reel ended.",
          "Watching at that volume is slow, and a notebook of half-captured posts does not become a list the team can filter. The friction was not a missing transcript. It was video that could not be looked up.",
        ],
      },
      {
        kind: "prose",
        kicker: "What we built",
        title: "A harvester tuned to this firm's reels.",
        paragraphs: [
          "Rinayra built a reels harvester for the kind of posts this firm actually publishes. It pulls the on-screen text with OCR, and it pulls the speech, and it writes both into a structured Excel sheet.",
          "The columns follow how this team already talks about a property. A reel becomes a row. The row can be filtered, sorted, and searched. Speech is there so the row is complete, not so the firm can read a transcript.",
        ],
      },
      {
        kind: "video",
        kicker: "How it works",
        title: "Messy video in. A searchable row out.",
        paragraphs: [
          "Reels go in. On-screen text is read. Speech is lined up into the same fields. The sheet is shaped around this firm's reel format, so the columns match the details they were already trying to capture by hand.",
          "A person can still correct a row. The system does the watching. The walkthrough of a reel becoming a row will sit here.",
        ],
        videoLabel: "Walkthrough video coming soon",
      },
      {
        kind: "results",
        kicker: "What changed",
        title: "What we will measure with them.",
        paragraphs: [
          "The value is a searchable sheet in place of a watch-queue. We do not have confirmed counts to publish, so the measures below are open.",
        ],
        metrics: [
          { label: "Reels reviewed by hand", value: "[X reels/week → Y]" },
          { label: "Time from a reel to a searchable row", value: "[X minutes → Y]" },
          { label: "Fields still checked by a person", value: "[to confirm]" },
        ],
      },
      {
        kind: "back",
        kicker: "If the work is trapped in video",
        title: "Make it a record the team can search.",
        paragraphs: [
          "If your day is spent replaying posts to copy what they already said, we should look at the posts together and decide which fields deserve a column.",
        ],
        ctaLabel: "Start a conversation",
        ctaHref: email,
      },
    ],
  },
  {
    slug: "skincare-brand-website",
    title: "A website for a skincare brand",
    excerpt:
      "A direct-to-consumer skincare site, still in progress. This is the brief, the structure, and the decisions. Not a launch recap.",
    client: "Skincare e-commerce brand",
    location: "India",
    sector: "E-commerce",
    status: "In progress",
    visual: "skincare",
    pages: [
      {
        kind: "cover",
        kicker: "Case study 03",
        title: "A website for a skincare brand",
        summary:
          "A direct-to-consumer skincare brand. The site is in progress. This is a process story. There are no screenshots here, and there is no launch to claim.",
        meta: [
          { label: "Client", value: "Unnamed, on purpose" },
          { label: "Trade", value: "Skincare, direct to consumer" },
          { label: "Place", value: "India" },
          { label: "Status", value: "In progress" },
        ],
      },
      {
        kind: "prose",
        kicker: "The client and their day",
        title: "A buyer arrives with a question, not a brief.",
        paragraphs: [
          "The brand sells skincare directly. A shopper lands with a skin concern, a routine they already have, or a product they half remember. The site has to explain the range, earn trust, and offer a clear way to buy.",
          "We started from that arrival. Who the products are for, what a careful buyer needs to understand, and where the decision actually happens.",
        ],
      },
      {
        kind: "prose",
        kicker: "The friction",
        title: "Story, range, and purchase were three different sites.",
        paragraphs: [
          "A brand site fails quietly when the point of view, the catalog, and the path to purchase do not feel like one sequence. The shopper is asked to start over on every page.",
          "The work is to make those one calm path. We are still in it. This is not a finished launch, and we are not showing the screen until the brand is ready.",
        ],
      },
      {
        kind: "prose",
        kicker: "What we built",
        title: "Structure first. Then a page that can sell.",
        paragraphs: [
          "Information architecture before decoration. A home that says who the products are for. A way into the range that follows the decision, not an internal org chart. Product pages that answer the questions a careful buyer asks.",
          "The visual direction is quiet and specific to the brand. It is not a generic template with a logo dropped on. Studies for that direction are abstract until there is a page worth showing.",
        ],
      },
      {
        kind: "video",
        kicker: "How it works",
        title: "Decisions, not a tour of a finished site.",
        paragraphs: [
          "Navigation follows the shopper's decision. The next step is repeated calmly, not stacked as popups. Trust sits next to the claim it supports: what the product is for, how it fits a routine, what is in it.",
          "A walkthrough will replace this frame when there is a build to walk through. Until then the slot stays empty on purpose.",
        ],
        videoLabel: "Walkthrough video coming soon",
      },
      {
        kind: "results",
        kicker: "What changed",
        title: "Nothing has launched.",
        paragraphs: [
          "Status is in progress. There is no traffic, conversion, or revenue figure to report, and we will not invent one. The open points below are for the team to fill when the path is real.",
        ],
        metrics: [
          { label: "Launch status", value: "In progress" },
          { label: "Shopper path we are designing", value: "[journey — to confirm]" },
          { label: "Page expected to do the most work", value: "[page — to confirm]" },
        ],
      },
      {
        kind: "back",
        kicker: "A site is the same method",
        title: "Watch the day, then make the pages.",
        paragraphs: [
          "If you sell directly and the site is working against the way people actually decide, start with that day. We will say plainly if a page is the right tool.",
        ],
        ctaLabel: "Start a conversation",
        ctaHref: email,
      },
    ],
  },
]

export function caseStudyBySlug(slug: string | undefined): CaseStudy | undefined {
  if (!slug) return undefined
  return caseStudies.find((study) => study.slug === slug)
}
