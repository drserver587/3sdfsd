import { useParams } from "react-router"
import { caseStudies, caseStudyBySlug } from "@/content/caseStudies"
import useDocumentTitle from "@/hooks/useDocumentTitle"
import ArticleCard from "./ArticleCard"
import BookReader from "./BookReader"
import Reveal from "./Reveal"

export default function CaseStudiesPage() {
  const { slug } = useParams()
  const study = caseStudyBySlug(slug)
  const missing = Boolean(slug) && !study
  useDocumentTitle(study ? `${study.title} — Rinayra Solutions` : "Case studies — Rinayra Solutions")

  return (
    <div className="px-5 pb-24 pt-32 lg:px-10 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c8f04d]">Case studies</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] lg:text-7xl">Work we can describe honestly.</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#d5d0c8]">
            Three engagements in India. Clients are unnamed. Where a result is not ours to state yet, the page keeps a placeholder instead of a number.
          </p>
        </Reveal>
        {missing ? (
          <p className="mt-8 border border-[#333] px-4 py-3 text-sm text-[#d5d0c8]" role="status">
            That case study is not on this page.
          </p>
        ) : null}
        <div className="mt-14 space-y-8 lg:mt-20">
          {caseStudies.map((item, index) => (
            <Reveal key={item.slug}>
              <ArticleCard study={item} reverse={index % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </div>
      {study ? <BookReader story={study} closeTo="/work/case-studies" /> : null}
    </div>
  )
}
