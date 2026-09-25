// Genera los íconos del sitio a partir de una sola cuadrícula pixel-art:
//   public/favicon.svg          vectorial, nítido a cualquier tamaño (navegadores modernos)
//   public/favicon.ico          16 + 32 + 48 px (pestañas y navegadores viejos)
//   public/apple-touch-icon.png 180 px, fondo opaco (pantalla de inicio de iOS)
//
// Uso:  node scripts/generate-favicon.mjs
// Sin dependencias: solo módulos internos de Node (fs, zlib).
//
// El dibujo es el mismo libro del logo (ICONS.book en src/components/pixel/pixel-art.ts)
// dentro de un marco dorado sobre fondo nocturno, con las esquinas cortadas como los marcos del
// sistema de diseño. El marco dorado da silueta tanto en pestañas claras como oscuras.
// Si cambias el libro del logo, actualiza BOOK y vuelve a correr este script.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync } from "node:zlib";

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

// Paleta (mismos valores que --px-* en src/styles.css).
const PALETTE = {
  k: "#0b0820", // tinta
  n: "#140d33", // night-900: fondo de la baldosa
  M: "#f7d51d", // oro: borde de la baldosa
  p: "#a45bf0", // morado
  P: "#6f2fbb", // morado oscuro
  h: "#fff3a0", // oro claro
  y: "#f7d51d", // oro
  w: "#ffffff", // hojas
  S: "#8f95b3", // sombra de las hojas
};

// Libro del logo (12×12). La última fila está vacía a propósito, igual que en el logo.
const BOOK = [
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
];

const SIZE = 16;

// Baldosa 16×16: marco de 1px y las cuatro esquinas recortadas.
function tile() {
  const grid = Array.from({ length: SIZE }, (_, y) =>
    Array.from({ length: SIZE }, (_, x) => {
      const edge = x === 0 || y === 0 || x === SIZE - 1 || y === SIZE - 1;
      const corner = (x === 0 || x === SIZE - 1) && (y === 0 || y === SIZE - 1);
      if (corner) return ".";
      return edge ? "M" : "n";
    }),
  );
  // Libro centrado horizontalmente; 2px de aire arriba.
  BOOK.forEach((row, by) => {
    [...row].forEach((ch, bx) => {
      if (ch !== ".") grid[by + 2][bx + 2] = ch;
    });
  });
  return grid.map((row) => row.join(""));
}

const hexToRgba = (hex) => {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 255];
};

// --- SVG ---------------------------------------------------------------------

function toSvg(rows) {
  const rects = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      const fill = PALETTE[ch];
      if (ch === "." || !fill) {
        x += 1;
        continue;
      }
      let end = x + 1;
      while (end < row.length && row[end] === ch) end += 1;
      rects.push(`<rect x="${x}" y="${y}" width="${end - x}" height="1" fill="${fill}"/>`);
      x = end;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" shape-rendering="crispEdges">${rects.join("")}</svg>\n`;
}

// --- Raster (RGBA) -----------------------------------------------------------

// Pinta `rows` a escala entera (vecino más cercano) dentro de un lienzo w×h.
// `bg` opcional rellena todo el lienzo antes de dibujar (fondo opaco).
function raster(rows, scale, w, h, offsetX, offsetY, bg) {
  const buf = Buffer.alloc(w * h * 4);
  if (bg) {
    const c = hexToRgba(bg);
    for (let i = 0; i < w * h; i += 1) buf.set(c, i * 4);
  }
  rows.forEach((row, ry) => {
    [...row].forEach((ch, rx) => {
      const hex = PALETTE[ch];
      if (ch === "." || !hex) return;
      const c = hexToRgba(hex);
      for (let dy = 0; dy < scale; dy += 1) {
        for (let dx = 0; dx < scale; dx += 1) {
          const px = offsetX + rx * scale + dx;
          const py = offsetY + ry * scale + dy;
          if (px >= 0 && px < w && py >= 0 && py < h) buf.set(c, (py * w + px) * 4);
        }
      }
    });
  });
  return buf;
}

// --- PNG ---------------------------------------------------------------------

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const head = Buffer.alloc(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])), 0);
  return Buffer.concat([head, data, crc]);
}

function toPng(rgba, w, h) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // 8 bits por canal
  ihdr[9] = 6; // RGBA
  const stride = w * 4;
  const raw = Buffer.alloc((stride + 1) * h);
  for (let y = 0; y < h; y += 1) {
    raw[y * (stride + 1)] = 0; // filtro "ninguno"
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// --- ICO (entradas PNG) ------------------------------------------------------

function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // tipo: ícono
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const e = Buffer.alloc(16);
    e[0] = size >= 256 ? 0 : size;
    e[1] = size >= 256 ? 0 : size;
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por píxel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}

// --- Salida ------------------------------------------------------------------

const rows = tile();
mkdirSync(PUBLIC_DIR, { recursive: true });

writeFileSync(join(PUBLIC_DIR, "favicon.svg"), toSvg(rows));

// 16 px = 1×, 32 px = 2×, 48 px = 3×: siempre escala entera, sin difuminar píxeles.
const icoImages = [1, 2, 3].map((scale) => {
  const size = SIZE * scale;
  return { size, png: toPng(raster(rows, scale, size, size, 0, 0), size, size) };
});
writeFileSync(join(PUBLIC_DIR, "favicon.ico"), toIco(icoImages));

// iOS aplica su propia máscara redondeada y rellena la transparencia de negro, así que aquí la
// baldosa va a 11× (176 px) sobre un fondo dorado de 180 px: las esquinas recortadas quedan
// cubiertas y el marco dorado se ve continuo.
const APPLE = 180;
const appleScale = 11;
const appleOffset = (APPLE - SIZE * appleScale) / 2;
const apple = raster(rows, appleScale, APPLE, APPLE, appleOffset, appleOffset, PALETTE.M);
writeFileSync(join(PUBLIC_DIR, "apple-touch-icon.png"), toPng(apple, APPLE, APPLE));

console.log(
  "Íconos generados en public/: favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png",
);
