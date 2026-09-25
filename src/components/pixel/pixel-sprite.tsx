import type { CSSProperties } from "react";

import { assetUrl } from "@/lib/asset-url";

// Hojas de sprites que ya usan los juegos (public/assets). El hub las reutiliza
// para que la plataforma se vea igual que lo que se juega dentro.
export type SpriteSheet = {
  src: string;
  sheet: readonly [number, number];
  frame: readonly [number, number];
};

export const SHEETS = {
  // 8 columnas × 9 filas de 32×32. Idle = frames 0-1 (fila 0), correr = fila 3.
  hero: {
    src: assetUrl("assets/game-attack/images/characters/AnimationSheet_Character.png"),
    sheet: [256, 288],
    frame: [32, 32],
  },
  // 6 × 4 de 64×64; la fila 0 es el idle de frente.
  slime: {
    src: assetUrl("assets/game-attack/images/enemies/Slime2_Idle_full.png"),
    sheet: [384, 256],
    frame: [64, 64],
  },
  // 4 × 4 de 64×64.
  plant: {
    src: assetUrl("assets/game-attack/images/enemies/Plant2_Idle_full.png"),
    sheet: [256, 256],
    frame: [64, 64],
  },
  // 10 frames de 64×64: 0 = topo fuera, 9 = escondido.
  mole: {
    src: assetUrl("assets/game-whack-a-question/sprites/mole.png"),
    sheet: [640, 64],
    frame: [64, 64],
  },
  // 10 frames de 64×64: 0 = borde del hoyo, 9 = hoyo abierto (oscuro).
  hole: {
    src: assetUrl("assets/game-whack-a-question/sprites/hole.png"),
    sheet: [640, 64],
    frame: [64, 64],
  },
} as const satisfies Record<string, SpriteSheet>;

type PixelSpriteProps = {
  sheet: SpriteSheet;
  /** Escala entera (2 → el doble). Siempre entera para que los píxeles queden nítidos. */
  scale?: number;
  col?: number;
  row?: number;
  /** Si es mayor que 1 se anima recorriendo `frames` columnas desde `col`. */
  frames?: number;
  fps?: number;
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function PixelSprite({
  sheet,
  scale = 2,
  col = 0,
  row = 0,
  frames = 1,
  fps = 6,
  flip = false,
  className = "",
  style,
}: PixelSpriteProps) {
  const vars = {
    "--src": `url("${sheet.src}")`,
    "--sw": sheet.sheet[0],
    "--sh": sheet.sheet[1],
    "--fw": sheet.frame[0],
    "--fh": sheet.frame[1],
    "--s": scale,
    "--col": col,
    "--row": row,
    "--frames": frames,
    "--fps": fps,
    ...style,
  } as CSSProperties;

  return (
    <span
      aria-hidden
      className={`px-sprite ${flip ? "px-sprite--flip" : ""} ${className}`}
      data-frames={frames > 1 ? frames : undefined}
      style={vars}
    />
  );
}

// Topo saliendo de un hoyo: hoyo (fondo) → topo animado → borde del hoyo (frente).
export function MoleInHole({
  scale = 2,
  delay = 0,
  duration = 3.6,
  className = "",
}: {
  scale?: number;
  /** Segundos de desfase para que varios topos no salgan a la vez. */
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const size = 64 * scale;
  const layer = { position: "absolute", left: 0, top: 0 } as const;

  return (
    <span
      aria-hidden
      className={`relative block flex-none ${className}`}
      style={{ width: size, height: size }}
    >
      <PixelSprite sheet={SHEETS.hole} scale={scale} col={9} style={layer} />
      <PixelSprite
        sheet={SHEETS.mole}
        scale={scale}
        className="px-sprite--mole"
        style={
          {
            ...layer,
            "--mole-dur": `${duration}s`,
            animationDelay: `${-delay}s`,
          } as CSSProperties
        }
      />
      <PixelSprite sheet={SHEETS.hole} scale={scale} col={0} style={layer} />
    </span>
  );
}
