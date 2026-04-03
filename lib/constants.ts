export const BASE_URL = "https://pvs-backend.leapcell.app";

// Mature, refined slate/stone colour palette
export const C = {
  bg:       "#0f1117",
  sidebar:  "#090c12",
  card:     "#151922",
  cardHov:  "#1a1f2b",
  border:   "#242938",
  border2:  "#1c2030",
  accent:   "#c9a84c",   // warm gold
  accent2:  "#a8722a",   // deeper amber
  accentBg: "rgba(201,168,76,0.08)",
  text:     "#d4dae8",
  muted:    "#6b7694",
  dimmed:   "#3d4560",
  green:    "#4caf82",
  greenBg:  "rgba(76,175,130,0.10)",
  red:      "#d9534f",
  redBg:    "rgba(217,83,79,0.10)",
  yellow:   "#d4a843",
  yellowBg: "rgba(212,168,67,0.10)",
  blue:     "#5b8dee",
  blueBg:   "rgba(91,141,238,0.10)",
} as const;

export const FONT = {
  body:  "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
  mono:  "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  head:  "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
} as const;