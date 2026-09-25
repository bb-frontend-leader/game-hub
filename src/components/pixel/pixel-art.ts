// Datos y helpers de pixel-art sin dependencias de React: cada dibujo es una
// cuadrícula de texto (una letra = un píxel) que se convierte en <rect>s de SVG
// con `shape-rendering: crispEdges`, así se ve nítido a cualquier escala entera.

// Paleta única del sistema de diseño. Los mismos valores viven como variables
// CSS (--px-*) en src/styles.css; cualquier cambio de paleta se hace en ambos.
export const PX = {
  ink: "#0b0820",
  night950: "#0f0a2b",
  night900: "#140d33",
  night800: "#1e1548",
  night700: "#2c1f6b",
  night600: "#43318f",
  night500: "#6553c4",
  night400: "#8a79e6",
  star: "#f4efff",
  lav: "#b9aef2",
  white: "#ffffff",

  gold: "#f7d51d",
  goldHi: "#fff3a0",
  goldLo: "#c98f0a",
  goldDk: "#8a5a00",
  green: "#92cc41",
  greenHi: "#c9ef8c",
  greenLo: "#58941f",
  greenDk: "#2f5f12",
  blue: "#209cee",
  blueHi: "#8fd3ff",
  blueLo: "#1266b3",
  blueDk: "#0a3d7a",
  red: "#e76e55",
  redHi: "#ffab9a",
  redLo: "#b03d29",
  redDk: "#6e1f14",
  purple: "#a45bf0",
  purpleHi: "#d2a8ff",
  purpleLo: "#6f2fbb",
  purpleDk: "#43167a",
  orange: "#f59f54",
  orangeHi: "#ffd0a0",
  orangeLo: "#c46a1c",
  cyan: "#5ceee1",
  cyanLo: "#2aa89d",
  pink: "#ff6b9a",
  brown: "#8a5a3c",
  brownLo: "#5a3620",
  silver: "#cfd3e6",
  silverLo: "#8f95b3",
  bronze: "#d08a4f",
  bronzeLo: "#8f5423",
} as const;

// Letra -> color. `x` es siempre `currentColor` (íconos de un solo color).
export const PALETTE: Record<string, string> = {
  x: "currentColor",
  k: PX.ink,
  w: PX.white,
  y: PX.gold,
  h: PX.goldHi,
  Y: PX.goldLo,
  D: PX.goldDk,
  g: PX.green,
  G: PX.greenLo,
  b: PX.blue,
  B: PX.blueLo,
  r: PX.red,
  R: PX.redLo,
  p: PX.purple,
  P: PX.purpleLo,
  o: PX.orange,
  c: PX.cyan,
  n: PX.brown,
  N: PX.brownLo,
  s: PX.silver,
  S: PX.silverLo,
  m: PX.night700,
  M: PX.night600,
};

export type PixelRect = { x: number; y: number; w: number; h: number; fill: string };

// Une píxeles contiguos del mismo color en rectángulos horizontales: menos nodos
// SVG y sin costuras entre píxeles.
export function artToRects(rows: readonly string[], palette: Record<string, string>): PixelRect[] {
  const rects: PixelRect[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row.charAt(x);
      const fill = ch === "." || ch === " " ? undefined : palette[ch];
      if (!fill) {
        x += 1;
        continue;
      }
      let end = x + 1;
      while (end < row.length && row.charAt(end) === ch) end += 1;
      rects.push({ x, y, w: end - x, h: 1, fill });
      x = end;
    }
  });
  return rects;
}

export function artSize(rows: readonly string[]) {
  return { w: Math.max(0, ...rows.map((r) => r.length)), h: rows.length };
}

// SVG como texto (para `background-image: url(data:...)`); aquí `currentColor` no
// existe, así que los teselados solo usan colores fijos.
export function artToSvg(rows: readonly string[], palette: Record<string, string> = PALETTE) {
  const { w, h } = artSize(rows);
  const body = artToRects(rows, palette)
    .map((r) => `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.fill}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" shape-rendering="crispEdges">${body}</svg>`;
}

export function artToDataUri(rows: readonly string[], palette: Record<string, string> = PALETTE) {
  return `url("data:image/svg+xml,${encodeURIComponent(artToSvg(rows, palette))}")`;
}

// ---------------------------------------------------------------------------
// Íconos 12×12. Los de una sola tinta usan `x` (toman el color del texto).
// ---------------------------------------------------------------------------

export const ICONS = {
  play: [
    "............",
    ".xx.........",
    ".xxxx.......",
    ".xxxxxx.....",
    ".xxxxxxxx...",
    ".xxxxxxxxxx.",
    ".xxxxxxxxxx.",
    ".xxxxxxxx...",
    ".xxxxxx.....",
    ".xxxx.......",
    ".xx.........",
    "............",
  ],
  "arrow-left": [
    "............",
    "....xx......",
    "...xxx......",
    "..xxxx......",
    ".xxxxxxxxxx.",
    "xxxxxxxxxxxx",
    "xxxxxxxxxxxx",
    ".xxxxxxxxxx.",
    "..xxxx......",
    "...xxx......",
    "....xx......",
    "............",
  ],
  close: [
    "............",
    ".xx......xx.",
    ".xxx....xxx.",
    "..xxx..xxx..",
    "...xxxxxx...",
    "....xxxx....",
    "....xxxx....",
    "...xxxxxx...",
    "..xxx..xxx..",
    ".xxx....xxx.",
    ".xx......xx.",
    "............",
  ],
  exit: [
    "............",
    ".xxxxxx.....",
    ".xx.........",
    ".xx....x....",
    ".xx....xx...",
    ".xx..xxxxx..",
    ".xx..xxxxxx.",
    ".xx..xxxxx..",
    ".xx....xx...",
    ".xx....x....",
    ".xxxxxx.....",
    "............",
  ],
  dice: [
    "............",
    ".xxxxxxxxxx.",
    ".x..xxxx..x.",
    ".x..xxxx..x.",
    ".xxxxxxxxxx.",
    ".xxxx..xxxx.",
    ".xxxx..xxxx.",
    ".xxxxxxxxxx.",
    ".x..xxxx..x.",
    ".x..xxxx..x.",
    ".xxxxxxxxxx.",
    "............",
  ],
  shield: [
    "............",
    ".xxxxxxxxxx.",
    ".xxxx..xxxx.",
    ".xxxx..xxxx.",
    ".xx......xx.",
    ".xx......xx.",
    "..xxx..xxx..",
    "..xxxx.xxx..",
    "...xxxxxx...",
    "....xxxx....",
    ".....xx.....",
    "............",
  ],
  users: [
    "............",
    "..x......x..",
    ".xxx....xxx.",
    ".xxx....xxx.",
    "..x......x..",
    "............",
    ".xxx....xxx.",
    "xxxxx..xxxxx",
    "xxxxx..xxxxx",
    "xxxxx..xxxxx",
    "xxxxx..xxxxx",
    "............",
  ],
  trash: [
    "............",
    "....xxxx....",
    ".xxxxxxxxxx.",
    "............",
    "..xxxxxxxx..",
    "..xx.xx.xx..",
    "..xx.xx.xx..",
    "..xx.xx.xx..",
    "..xx.xx.xx..",
    "..xx.xx.xx..",
    "..xxxxxxxx..",
    "............",
  ],
  reset: [
    "............",
    "....xxxxx...",
    "...xxxxxxx..",
    ".xxxx...xx..",
    "xxxxx....xx.",
    ".xxx.....xx.",
    ".x.......xx.",
    "........xx..",
    "..xx...xxx..",
    "...xxxxxx...",
    "....xxxx....",
    "............",
  ],
  check: [
    "............",
    "..........xx",
    ".........xxx",
    "........xxx.",
    ".xx....xxx..",
    ".xxx..xxx...",
    "..xxxxxx....",
    "...xxxx.....",
    "....xx......",
    "............",
    "............",
    "............",
  ],
  alert: [
    "............",
    ".....xx.....",
    ".....xx.....",
    ".....xx.....",
    ".....xx.....",
    ".....xx.....",
    ".....xx.....",
    "............",
    ".....xx.....",
    ".....xx.....",
    "............",
    "............",
  ],
  info: [
    "............",
    ".....xx.....",
    ".....xx.....",
    "............",
    "....xxx.....",
    ".....xx.....",
    ".....xx.....",
    ".....xx.....",
    "....xxxx....",
    "............",
    "............",
    "............",
  ],
  sound: [
    "............",
    ".....x......",
    "....xx..x...",
    "xxxxxx...x..",
    "xxxxxx.x.x..",
    "xxxxxx.x.x..",
    "xxxxxx.x.x..",
    "xxxxxx...x..",
    "....xx..x...",
    ".....x......",
    "............",
    "............",
  ],
  trophy: [
    "..kkkkkkkk..",
    "kkkhhyyyykkk",
    "kykhyyyyykyk",
    "kykhyyyyykyk",
    ".kkkyyyykkk.",
    "...kyyyyk...",
    "....kYYk....",
    "....kYYk....",
    ".....kk.....",
    "..kkkkkkkk..",
    "..kYYYYYYk..",
    "..kkkkkkkk..",
  ],
  star: [
    ".....kk.....",
    "....kyyk....",
    "....kyyk....",
    "kkkkkyykkkkk",
    "kyyyyhyyyyyk",
    ".kyyyyyyyyk.",
    "..kyyyyyyk..",
    "..kyyyyyyk..",
    ".kyyyyyyyyk.",
    ".kyyykkyyyk.",
    ".kyykk.kkyk.",
    ".kkk....kkk.",
  ],
  heart: [
    "............",
    ".kkk....kkk.",
    "kwrrk..krrrk",
    "kwrrrkkrrrrk",
    "krrrrrrrrrRk",
    "krrrrrrrrrRk",
    ".krrrrrrrRk.",
    "..krrrrrRk..",
    "...krrrRk...",
    "....krRk....",
    ".....kk.....",
    "............",
  ],
  coin: [
    "............",
    "....kkkk....",
    "..kkyyyykk..",
    ".kyyhhyyyYk.",
    ".kyhyyyyyYk.",
    ".kyhyykkyYk.",
    ".kyhyykkyYk.",
    ".kyyyyyyyYk.",
    ".kyyyyyyYYk.",
    "..kkYYYYkk..",
    "....kkkk....",
    "............",
  ],
  medal: [
    "..rr....bb..",
    "..rrr..bbb..",
    "...rrrbbb...",
    "....rrbb....",
    "...kkkkkk...",
    "..kyyyyyyk..",
    ".kyyhhhyyyk.",
    ".kyhyyyyyYk.",
    ".kyyyyyyyYk.",
    ".kyyyyyyYYk.",
    "..kYYYYYYk..",
    "...kkkkkk...",
  ],
  book: [
    "..kkkkkkkk..",
    ".kpppppppppk",
    ".kpPPPPPPPpk",
    ".kpPhyhyhPpk",
    ".kpPyyyyyPpk",
    ".kpPhyhyhPpk",
    ".kpPPPPPPPpk",
    ".kpppppppppk",
    ".kwwwwwwwwwk",
    ".kSSSSSSSSSk",
    "..kkkkkkkkk.",
    "............",
  ],
  sparkle: [
    ".....xx.....",
    ".....xx.....",
    ".....xx.....",
    "..x..xx..x..",
    "...xxxxxx...",
    "xxxxxxxxxxxx",
    "xxxxxxxxxxxx",
    "...xxxxxx...",
    "..x..xx..x..",
    ".....xx.....",
    ".....xx.....",
    ".....xx.....",
  ],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof ICONS;

// "404" en letras de 5×7 (el 4 y el 0 con un pixel de separación).
const DIGIT_4 = ["x...x", "x...x", "x...x", "xxxxx", "....x", "....x", "....x"];
const DIGIT_0 = [".xxx.", "x...x", "x..xx", "x.x.x", "xx..x", "x...x", ".xxx."];
export const CODE_404 = DIGIT_4.map((row, i) => `${row}.${DIGIT_0[i]}.${row}`);

// Silueta de nube (20×7) — se pinta con un solo color.
export const CLOUD = [
  "......xxxx..........",
  "....xxxxxxxx...xxx..",
  "..xxxxxxxxxxxxxxxxx.",
  ".xxxxxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxxxxxx",
  ".xxxxxxxxxxxxxxxxxx.",
  "..xxxxxxxxxxxxxxxx..",
] as const;

// Luna (14×14) con cráteres.
export const MOON = [
  "....xxxxxx....",
  "..xxxxxxxxxx..",
  ".xxxxxxxxxxxx.",
  ".xxxxoooxxxxx.",
  "xxxxxoooxxxxxx",
  "xxxxxxxxxxxoox",
  "xxxxxxxxxxxoox",
  "xxooxxxxxxxxxx",
  "xxooxxxxxooxxx",
  "xxxxxxxxxooxxx",
  ".xxxxxxxxxxxx.",
  ".xxxxxxxxxxxx.",
  "..xxxxxxxxxx..",
  "....xxxxxx....",
] as const;

// Teselas del suelo (16×16): pasto arriba, tierra abajo.
export const GROUND_TILE = [
  "..g...g.....g...",
  ".ggg.ggg...ggg..",
  "gggggggggggggggg",
  "hhhhhhhhhhhhhhhh",
  "gggggggggggggggg",
  "GGGGGGGGGGGGGGGG",
  "nnnnnnnnnnnnnnnn",
  "nnnnNNnnnnnnnnnn",
  "nnnnnnnnnnnNNnnn",
  "nnNNnnnnnnnnnnnn",
  "nnnnnnnnnnnnnnNN",
  "nnnnnnnNNnnnnnnn",
  "nnNNnnnnnnnnnnnn",
  "nnnnnnnnnnNNnnnn",
  "NNNNNNNNNNNNNNNN",
  "NNNNNNNNNNNNNNNN",
] as const;

// Siluetas de pinos para el horizonte: teselado horizontal continuo (los árboles
// que se salen por un borde reaparecen por el otro). Cada árbol = [x central, alto].
function makePines(width: number, height: number, trees: ReadonlyArray<readonly [number, number]>) {
  const grid = Array.from({ length: height }, () => Array.from({ length: width }, () => "."));
  const put = (x: number, y: number) => {
    const row = grid[y];
    if (row) row[((x % width) + width) % width] = "x";
  };
  for (const [cx, treeH] of trees) {
    const trunk = 2;
    const canopy = treeH - trunk;
    for (let j = 0; j < canopy; j += 1) {
      const half = Math.min(3, Math.floor((j + 1) / 2));
      for (let dx = -half; dx <= half; dx += 1) put(cx + dx, height - treeH + j);
    }
    for (let j = canopy; j < treeH; j += 1) put(cx, height - treeH + j);
  }
  // Dos filas de suelo continuo: sin ellas los troncos quedan flotando en el aire.
  const rows = grid.map((row) => row.join(""));
  return [...rows.slice(0, height - 2), ...Array.from({ length: 2 }, () => "x".repeat(width))];
}

export const PINES = makePines(48, 14, [
  [4, 9],
  [11, 13],
  [18, 8],
  [25, 12],
  [32, 10],
  [39, 14],
  [45, 7],
]);

export const PINES_PALETTE: Record<string, string> = { x: PX.night800 };

// El pasto usa un verde más claro para el resalte (`h` en la paleta general es
// dorado, así que el suelo trae su propia paleta).
export const GROUND_PALETTE: Record<string, string> = {
  ...PALETTE,
  g: PX.green,
  G: PX.greenLo,
  h: PX.greenHi,
  n: PX.brown,
  N: PX.brownLo,
};
