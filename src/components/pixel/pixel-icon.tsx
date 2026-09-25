import { artSize, artToRects, type IconName, ICONS, PALETTE } from "./pixel-art";

type PixelArtProps = {
  rows: readonly string[];
  palette?: Record<string, string>;
  /** Píxeles de pantalla por cuadro de la cuadrícula. Siempre entero para que quede nítido. */
  scale?: number;
  /** Si se da, el dibujo se anuncia a lectores de pantalla; si no, es decorativo. */
  title?: string;
  className?: string;
};

// Dibuja una cuadrícula de texto (ver pixel-art.ts) como SVG nítido.
export function PixelArt({ rows, palette = PALETTE, scale = 2, title, className }: PixelArtProps) {
  const { w, h } = artSize(rows);
  const rects = artToRects(rows, palette);

  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={className}
    >
      {title ? <title>{title}</title> : null}
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} />
      ))}
    </svg>
  );
}

type PixelIconProps = {
  name: IconName;
  /** 12×12 cuadros: escala 2 → 24px, 3 → 36px. */
  scale?: number;
  /** Cambia colores por letra de la cuadrícula, p. ej. { y: "#cfd3e6" } para una medalla de plata. */
  colors?: Record<string, string>;
  title?: string;
  className?: string;
};

export function PixelIcon({ name, scale = 2, colors, title, className }: PixelIconProps) {
  return (
    <PixelArt
      rows={ICONS[name]}
      palette={colors ? { ...PALETTE, ...colors } : PALETTE}
      scale={scale}
      {...(title ? { title } : {})}
      {...(className ? { className } : {})}
    />
  );
}

// Medallas del ranking: oro, plata y bronce comparten el dibujo y cambian de color.
const MEDAL_COLORS: Record<1 | 2 | 3, Record<string, string>> = {
  1: {},
  2: { y: "#cfd3e6", h: "#ffffff", Y: "#8f95b3" },
  3: { y: "#d08a4f", h: "#f0bd8a", Y: "#8f5423" },
};

export function RankBadge({
  rank,
  scale = 3,
  className = "",
}: {
  rank: number;
  scale?: number;
  className?: string;
}) {
  if (rank >= 1 && rank <= 3) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <PixelIcon
          name="medal"
          scale={scale}
          colors={MEDAL_COLORS[rank as 1 | 2 | 3]}
          title={`Puesto ${rank}`}
        />
      </span>
    );
  }
  // El número acompaña el tamaño de la medalla (3 → 18px, 4 → 24px).
  return (
    <span
      className={`inline-flex items-center justify-center font-pixel font-bold text-lav ${className}`}
      style={{ fontSize: scale * 6 }}
    >
      {rank}
    </span>
  );
}
