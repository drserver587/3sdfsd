import type { CaseVisual } from "@/content/types"
import { assertNever } from "@/content/types"

type ArtProps = { className?: string }

export function StudiesArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 640 420" role="img" aria-label="Stacked editorial pages">
      <rect width="640" height="420" fill="#121212" />
      <g transform="translate(78 64) rotate(-7)">
        <rect width="250" height="300" fill="#d7c4ae" />
      </g>
      <g transform="translate(168 48) rotate(4)">
        <rect width="270" height="320" fill="#efeae0" />
        <rect x="28" y="36" width="84" height="8" fill="#c8f04d" />
        <rect x="28" y="68" width="180" height="6" fill="#1a1a1a" />
        <rect x="28" y="86" width="150" height="6" fill="#1a1a1a" opacity="0.55" />
        <rect x="28" y="104" width="164" height="6" fill="#1a1a1a" opacity="0.35" />
        <rect x="28" y="150" width="210" height="110" fill="#1a1a1a" />
        <path d="M48 230h70M48 214h120" stroke="#c8f04d" strokeWidth="4" />
      </g>
      <g transform="translate(300 78)">
        <rect width="220" height="250" fill="#8aa0b4" />
        <circle cx="156" cy="70" r="28" fill="#c8f04d" />
      </g>
    </svg>
  )
}

export function MethodArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 640 420" role="img" aria-label="Scattered notes pulling into a row">
      <rect width="640" height="420" fill="#121212" />
      <g fill="none" stroke="#efeae0" strokeWidth="1.5">
        <rect x="70" y="70" width="90" height="120" transform="rotate(-12 115 130)" />
        <rect x="210" y="48" width="120" height="70" transform="rotate(8 270 83)" />
        <rect x="420" y="90" width="80" height="80" transform="rotate(16 460 130)" />
        <rect x="150" y="230" width="140" height="88" transform="rotate(-6 220 274)" />
        <rect x="360" y="240" width="70" height="100" transform="rotate(10 395 290)" />
      </g>
      <path d="M90 340h460" stroke="#c8f04d" strokeWidth="2" />
      <rect x="86" y="318" width="78" height="44" fill="#efeae0" />
      <rect x="190" y="318" width="78" height="44" fill="#d08a62" />
      <rect x="294" y="318" width="78" height="44" fill="#efeae0" />
      <rect x="398" y="318" width="78" height="44" fill="#8aa0b4" />
      <circle cx="516" cy="340" r="16" fill="#c8f04d" />
    </svg>
  )
}

export function DemosArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 640 420" role="img" aria-label="Three unfinished frames">
      <rect width="640" height="420" fill="#121212" />
      <g fill="none" stroke="#efeae0" strokeWidth="1.5">
        <rect x="70" y="80" width="150" height="200" strokeDasharray="4 6" />
        <rect x="250" y="60" width="170" height="240" />
        <rect x="450" y="100" width="130" height="170" strokeDasharray="4 6" />
      </g>
      <path d="M318 160l48 28-48 28z" fill="#c8f04d" />
      <rect x="270" y="84" width="40" height="6" fill="#d08a62" />
    </svg>
  )
}

export function WholesaleArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 720 520" role="img" aria-label="Abstract invoice grid and stock rows">
      <rect width="720" height="520" fill="#161616" />
      <rect x="56" y="48" width="280" height="400" fill="#efeae0" />
      <rect x="84" y="80" width="90" height="10" fill="#c8f04d" />
      <g fill="#1a1a1a">
        <rect x="84" y="120" width="200" height="4" opacity="0.8" />
        <rect x="84" y="140" width="160" height="4" opacity="0.45" />
        <rect x="84" y="160" width="180" height="4" opacity="0.45" />
        <rect x="84" y="200" width="210" height="140" />
      </g>
      <g stroke="#c8f04d" strokeWidth="3">
        <path d="M104 250h80M104 274h120M104 298h60" />
      </g>
      <g fill="#8aa0b4">
        <rect x="380" y="70" width="260" height="36" />
        <rect x="380" y="122" width="220" height="36" />
        <rect x="380" y="174" width="250" height="36" />
        <rect x="380" y="226" width="180" height="36" />
      </g>
      <rect x="380" y="300" width="260" height="130" fill="none" stroke="#d08a62" strokeWidth="2" />
      <path d="M404 360h90M404 384h140" stroke="#efeae0" strokeWidth="3" />
    </svg>
  )
}

export function ReelsArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 720 520" role="img" aria-label="A reel frame becoming structured rows">
      <rect width="720" height="520" fill="#161616" />
      <rect x="70" y="48" width="250" height="420" rx="28" fill="#efeae0" />
      <rect x="96" y="150" width="198" height="120" fill="#1a1a1a" />
      <path d="M170 188l48 26-48 26z" fill="#c8f04d" />
      <g fill="#1a1a1a" opacity="0.55">
        <rect x="110" y="300" width="150" height="6" />
        <rect x="110" y="320" width="110" height="6" />
        <rect x="110" y="340" width="130" height="6" />
      </g>
      <g>
        <rect x="370" y="90" width="270" height="48" fill="#8aa0b4" />
        <rect x="370" y="156" width="240" height="48" fill="#d08a62" />
        <rect x="370" y="222" width="270" height="48" fill="#efeae0" />
        <rect x="370" y="288" width="200" height="48" fill="#c8f04d" />
      </g>
    </svg>
  )
}

export function SkincareArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 720 520" role="img" aria-label="Abstract studies for a quiet skincare site">
      <rect width="720" height="520" fill="#161616" />
      <circle cx="210" cy="250" r="150" fill="#efeae0" />
      <circle cx="300" cy="210" r="70" fill="#d7c4ae" />
      <path d="M430 120c40 70 40 150 0 240" fill="none" stroke="#c8f04d" strokeWidth="3" />
      <rect x="470" y="140" width="160" height="220" fill="none" stroke="#efeae0" strokeWidth="1.5" />
      <path d="M500 250h100M500 278h70" stroke="#8aa0b4" strokeWidth="4" />
      <circle cx="530" cy="190" r="16" fill="#d08a62" />
    </svg>
  )
}

export function CaseArt({ visual, className }: { visual: CaseVisual; className?: string }) {
  switch (visual) {
    case "wholesale":
      return <WholesaleArt className={className} />
    case "reels":
      return <ReelsArt className={className} />
    case "skincare":
      return <SkincareArt className={className} />
    default:
      return assertNever(visual)
  }
}

export function FeatureArt({ art, className }: { art: "studies" | "method" | "demos"; className?: string }) {
  switch (art) {
    case "studies":
      return <StudiesArt className={className} />
    case "method":
      return <MethodArt className={className} />
    case "demos":
      return <DemosArt className={className} />
    default:
      return assertNever(art)
  }
}
