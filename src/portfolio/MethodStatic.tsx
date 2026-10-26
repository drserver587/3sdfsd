import { methodSteps } from "@/content/site"
import { BOXES, CHAOS_ITEMS, FLOW, type BoxId } from "./chaosData"
import Scrap from "./Scraps"

function OrganizedFigure() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-hidden="true">
      {FLOW.map((id: BoxId) => (
        <div key={id} className="border border-white/20 p-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#c8f04d]">{BOXES[id].label}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CHAOS_ITEMS.filter((item) => item.box === id).map((item) => (
              <div key={item.id} className="h-16 w-16">
                <Scrap kind={item.kind} label={item.label} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function MethodStatic() {
  return (
    <div className="px-5 pb-8 lg:px-10">
      <ol className="mx-auto max-w-3xl">
        {methodSteps.map((step) => (
          <li key={step.id} className="border-t border-[#222] py-8">
            <p className="font-display text-xs text-[#c8f04d]">{step.num}</p>
            <h2 className="mt-2 font-serif text-3xl">{step.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#d5d0c8]">{step.body}</p>
            {step.id === "organize" ? <OrganizedFigure /> : null}
            {step.id === "build" ? (
              <p className="mt-4 text-sm text-[#c8f04d]">Those boxes connect, left to right, into one flow.</p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}
