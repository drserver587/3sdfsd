export type ItemKind = "invoice" | "receipt" | "note" | "chat" | "sheet" | "phone" | "paper"
export type BoxId = "invoices" | "messages" | "calls" | "sheets"

export type ChaosItem = {
  id: string
  kind: ItemKind
  label: string
  box: BoxId
  friction: boolean
  mobile: boolean
  chaos: { x: number; y: number; r: number }
  chaosMobile: { x: number; y: number; r: number }
}

type Frame = { x: number; y: number; w: number; h: number }

export const FLOW: BoxId[] = ["invoices", "messages", "calls", "sheets"]

export const BOXES: Record<
  BoxId,
  { label: string; ordered: Frame; pipeline: Frame; orderedMobile: Frame; pipelineMobile: Frame }
> = {
  invoices: {
    label: "Invoices",
    ordered: { x: 3, y: 6, w: 30, h: 70 },
    pipeline: { x: 3, y: 8, w: 21, h: 58 },
    orderedMobile: { x: 2, y: 3, w: 47, h: 42 },
    pipelineMobile: { x: 10, y: 3, w: 80, h: 20 },
  },
  messages: {
    label: "Messages",
    ordered: { x: 35, y: 6, w: 30, h: 34 },
    pipeline: { x: 27.5, y: 8, w: 21, h: 58 },
    orderedMobile: { x: 51, y: 3, w: 47, h: 42 },
    pipelineMobile: { x: 10, y: 26, w: 80, h: 20 },
  },
  calls: {
    label: "Calls & notes",
    ordered: { x: 35, y: 42, w: 30, h: 34 },
    pipeline: { x: 52, y: 8, w: 21, h: 58 },
    orderedMobile: { x: 2, y: 48, w: 47, h: 42 },
    pipelineMobile: { x: 10, y: 49, w: 80, h: 20 },
  },
  sheets: {
    label: "Sheets",
    ordered: { x: 67, y: 6, w: 30, h: 70 },
    pipeline: { x: 76.5, y: 8, w: 21, h: 58 },
    orderedMobile: { x: 51, y: 48, w: 47, h: 42 },
    pipelineMobile: { x: 10, y: 72, w: 80, h: 20 },
  },
}

const SIZE: Record<ItemKind, { w: number; h: number }> = {
  invoice: { w: 84, h: 104 },
  receipt: { w: 72, h: 96 },
  note: { w: 86, h: 74 },
  chat: { w: 108, h: 54 },
  sheet: { w: 100, h: 72 },
  phone: { w: 62, h: 62 },
  paper: { w: 76, h: 100 },
}

export const CHAOS_ITEMS: ChaosItem[] = [
  { id: "inv-1", kind: "invoice", label: "INV", box: "invoices", friction: true, mobile: true, chaos: { x: 16, y: 24, r: -14 }, chaosMobile: { x: 24, y: 20, r: -12 } },
  { id: "inv-2", kind: "invoice", label: "PO", box: "invoices", friction: false, mobile: true, chaos: { x: 74, y: 70, r: 9 }, chaosMobile: { x: 72, y: 64, r: 8 } },
  { id: "rec-1", kind: "receipt", label: "Receipt", box: "invoices", friction: false, mobile: false, chaos: { x: 42, y: 78, r: 12 }, chaosMobile: { x: 50, y: 50, r: 0 } },
  { id: "rec-2", kind: "receipt", label: "Sales", box: "invoices", friction: false, mobile: true, chaos: { x: 36, y: 14, r: 5 }, chaosMobile: { x: 46, y: 46, r: 4 } },
  { id: "chat-1", kind: "chat", label: "Ping", box: "messages", friction: true, mobile: true, chaos: { x: 64, y: 18, r: 7 }, chaosMobile: { x: 70, y: 30, r: 6 } },
  { id: "chat-2", kind: "chat", label: "Unread", box: "messages", friction: false, mobile: false, chaos: { x: 28, y: 46, r: -8 }, chaosMobile: { x: 40, y: 40, r: 0 } },
  { id: "sheet-1", kind: "sheet", label: "Row 14", box: "sheets", friction: true, mobile: true, chaos: { x: 80, y: 42, r: -6 }, chaosMobile: { x: 30, y: 74, r: -6 } },
  { id: "sheet-2", kind: "sheet", label: "Stock", box: "sheets", friction: false, mobile: true, chaos: { x: 14, y: 62, r: 11 }, chaosMobile: { x: 78, y: 80, r: 8 } },
  { id: "sheet-3", kind: "sheet", label: "Tab", box: "sheets", friction: false, mobile: false, chaos: { x: 50, y: 32, r: 15 }, chaosMobile: { x: 50, y: 50, r: 0 } },
  { id: "phone-1", kind: "phone", label: "Call", box: "calls", friction: false, mobile: true, chaos: { x: 86, y: 80, r: -12 }, chaosMobile: { x: 18, y: 44, r: -8 } },
  { id: "note-1", kind: "note", label: "Note", box: "calls", friction: true, mobile: true, chaos: { x: 22, y: 84, r: 8 }, chaosMobile: { x: 52, y: 16, r: 7 } },
  { id: "paper-1", kind: "paper", label: "Slip", box: "calls", friction: false, mobile: false, chaos: { x: 56, y: 54, r: -11 }, chaosMobile: { x: 50, y: 50, r: 0 } },
]

export const STEP_PROGRESS = [0.04, 0.18, 0.38, 0.6, 0.78, 0.94]

export type Stage = { width: number; height: number }
export type Pose = { x: number; y: number; r: number; s: number }
export type BoxPose = { x: number; y: number; w: number; h: number; opacity: number }

export function itemSize(kind: ItemKind, desktop: boolean) {
  const base = SIZE[kind]
  const scale = desktop ? 1 : 0.7
  return { w: base.w * scale, h: base.h * scale }
}

export function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value))
  return t * t * (3 - 2 * t)
}

export function segment(progress: number, start: number, end: number) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return smooth((progress - start) / (end - start))
}

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

function lerpPose(from: Pose, to: Pose, amount: number): Pose {
  return {
    x: mix(from.x, to.x, amount),
    y: mix(from.y, to.y, amount),
    r: mix(from.r, to.r, amount),
    s: mix(from.s, to.s, amount),
  }
}

export function stepIndex(progress: number) {
  const edges = [0.14, 0.3, 0.52, 0.72, 0.86]
  const found = edges.findIndex((edge) => progress < edge)
  return found === -1 ? edges.length : found
}

function percentFrame(frame: Frame, stage: Stage) {
  return {
    x: (frame.x / 100) * stage.width,
    y: (frame.y / 100) * stage.height,
    w: (frame.w / 100) * stage.width,
    h: (frame.h / 100) * stage.height,
  }
}

export function boxFrame(id: BoxId, mode: "ordered" | "pipeline", stage: Stage, desktop: boolean) {
  const spec = BOXES[id]
  const frame = desktop ? (mode === "ordered" ? spec.ordered : spec.pipeline) : mode === "ordered" ? spec.orderedMobile : spec.pipelineMobile
  return percentFrame(frame, stage)
}

function clampCenter(x: number, y: number, width: number, height: number, stage: Stage) {
  const halfW = width / 2
  const halfH = height / 2
  return {
    x: Math.min(stage.width - halfW - 4, Math.max(halfW + 4, x)),
    y: Math.min(stage.height - halfH - 4, Math.max(halfH + 4, y)),
  }
}

function chaosPose(item: ChaosItem, stage: Stage, desktop: boolean): Pose {
  const spot = desktop ? item.chaos : item.chaosMobile
  const size = itemSize(item.kind, desktop)
  const center = clampCenter((spot.x / 100) * stage.width, (spot.y / 100) * stage.height, size.w, size.h, stage)
  return { x: center.x, y: center.y, r: spot.r, s: 1 }
}

function slotPose(item: ChaosItem, mode: "ordered" | "pipeline", stage: Stage, desktop: boolean): Pose {
  const group = CHAOS_ITEMS.filter((entry) => entry.box === item.box && (desktop || entry.mobile))
  const slot = Math.max(0, group.findIndex((entry) => entry.id === item.id))
  const frame = boxFrame(item.box, mode, stage, desktop)
  const size = itemSize(item.kind, desktop)
  const labelH = Math.min(32, frame.h * 0.2)
  const padX = frame.w * 0.08
  const padBottom = frame.h * 0.06
  const innerW = Math.max(1, frame.w - padX * 2)
  const innerH = Math.max(1, frame.h - labelH - padBottom)
  const cols = group.length >= 3 && innerW > size.w * 1.5 ? 2 : 1
  const rows = Math.ceil(group.length / cols)
  const col = slot % cols
  const row = Math.floor(slot / cols)
  const cellW = innerW / cols
  const cellH = innerH / rows
  const scale = Math.min(1, (cellW * 0.9) / size.w, (cellH * 0.9) / size.h)
  return {
    x: frame.x + padX + col * cellW + cellW / 2,
    y: frame.y + labelH + row * cellH + cellH / 2,
    r: 0,
    s: scale,
  }
}

export function itemAt(item: ChaosItem, progress: number, stage: Stage, desktop: boolean): Pose & { glow: number } {
  const pose = lerpPose(
    lerpPose(chaosPose(item, stage, desktop), slotPose(item, "ordered", stage, desktop), segment(progress, 0.3, 0.52)),
    slotPose(item, "pipeline", stage, desktop),
    segment(progress, 0.56, 0.74),
  )
  const glow = item.friction ? segment(progress, 0.12, 0.22) * (1 - segment(progress, 0.28, 0.42)) : 0
  return { ...pose, glow }
}

export function boxAt(id: BoxId, progress: number, stage: Stage, desktop: boolean): BoxPose {
  const ordered = boxFrame(id, "ordered", stage, desktop)
  const pipeline = boxFrame(id, "pipeline", stage, desktop)
  const amount = segment(progress, 0.56, 0.74)
  return {
    x: mix(ordered.x, pipeline.x, amount),
    y: mix(ordered.y, pipeline.y, amount),
    w: mix(ordered.w, pipeline.w, amount),
    h: mix(ordered.h, pipeline.h, amount),
    opacity: segment(progress, 0.26, 0.4),
  }
}
