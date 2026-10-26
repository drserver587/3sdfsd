import type { ItemKind } from "./chaosData"

export default function Scrap({ kind, label }: { kind: ItemKind; label: string }) {
  return (
    <div className={`scrap scrap-${kind}`} aria-hidden="true">
      <span className="scrap-label">{label}</span>
      <span className="scrap-lines" />
    </div>
  )
}
