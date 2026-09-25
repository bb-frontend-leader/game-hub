import type { CSSProperties, ReactNode } from "react";

import {
  artToDataUri,
  CLOUD,
  GROUND_PALETTE,
  GROUND_TILE,
  MOON,
  PALETTE,
  PINES,
  PINES_PALETTE,
} from "./pixel-art";
import { PixelArt } from "./pixel-icon";
import { MoleInHole, PixelSprite, SHEETS } from "./pixel-sprite";

// --- Campo de estrellas -----------------------------------------------------
// Cada estrella es una sombra (box-shadow) de un cuadrito de 2 o 4px, ubicada en
// vw/vh. Se calcula una vez con un generador con semilla fija: mismo resultado en
// servidor y cliente (sin hidratación rota) y sin Math.random durante el render.

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

function starField(count: number, seed: number, colors: readonly string[]) {
  const rand = lcg(seed);
  return Array.from({ length: count }, () => {
    const x = (rand() * 100).toFixed(1);
    const y = (rand() * 80).toFixed(1);
    const color = colors[Math.floor(rand() * colors.length)] ?? "#f4efff";
    return `${x}vw ${y}vh 0 ${color}`;
  }).join(",");
}

const STARS_SMALL = starField(80, 7, ["#f4efff", "#b9aef2", "#f4efff", "#8f83d8"]);
const STARS_BIG = starField(24, 21, ["#fff3a0", "#f4efff", "#5ceee1", "#ffb0c9"]);

const PINES_URI = artToDataUri(PINES, PINES_PALETTE);
const GROUND_URI = artToDataUri(GROUND_TILE, GROUND_PALETTE);

const MOON_PALETTE = { ...PALETTE, x: "#fff3c0", o: "#e6d590" };

const CLOUDS = [
  { top: "7vh", scale: 8, dur: 170, delay: -40, left: "18vw" },
  { top: "21vh", scale: 5, dur: 220, delay: -130, left: "62vw" },
  { top: "35vh", scale: 6, dur: 190, delay: -20, left: "36vw" },
  { top: "49vh", scale: 4, dur: 250, delay: -90, left: "80vw" },
] as const;

// Fondo fijo de toda la app: cielo nocturno con estrellas que titilan, luna, nubes
// a la deriva y un horizonte de pinos. Es decorativo (aria-hidden).
export function PixelSky() {
  return (
    <div aria-hidden className="px-sky">
      <div
        className="px-sky__stars animate-px-twinkle"
        style={
          { width: 2, height: 2, boxShadow: STARS_SMALL, "--twinkle-dur": "5s" } as CSSProperties
        }
      />
      <div
        className="px-sky__stars animate-px-twinkle"
        style={
          {
            width: 4,
            height: 4,
            boxShadow: STARS_BIG,
            "--twinkle-dur": "3s",
            animationDelay: "-1s",
          } as CSSProperties
        }
      />
      <div className="px-sky__moon">
        <PixelArt rows={MOON} palette={MOON_PALETTE} scale={4} className="sm:hidden" />
        <PixelArt rows={MOON} palette={MOON_PALETTE} scale={7} className="hidden sm:block" />
      </div>
      {CLOUDS.map((c) => (
        <div
          key={c.top}
          className="px-sky__cloud"
          style={
            {
              top: c.top,
              "--cloud-dur": `${c.dur}s`,
              "--cloud-delay": `${c.delay}s`,
              "--cloud-left": c.left,
            } as CSSProperties
          }
        >
          <PixelArt rows={CLOUD} scale={c.scale} />
        </div>
      ))}
      <div className="px-sky__pines" style={{ backgroundImage: PINES_URI }} />
    </div>
  );
}

// Franja de suelo con pasto donde "caminan" los personajes de los juegos.
export function PixelGround({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div aria-hidden className={`px-ground ${className}`} style={{ backgroundImage: GROUND_URI }}>
      {children}
    </div>
  );
}

// Desfile decorativo: el mago rojo corre, un slime rebota, una planta y un topo
// asoman. Los personajes salen de los sprites reales de Temple of Knowledge y
// Whack a game.
export function GroundParade() {
  return (
    <>
      <div className="px-ground__actor px-ground__walker">
        <PixelSprite sheet={SHEETS.hero} scale={4} row={3} frames={4} fps={8} />
      </div>
      <div className="px-ground__actor" style={{ left: "10%" }}>
        <MoleInHole scale={1.1} delay={0.6} />
      </div>
      <div className="px-ground__actor" style={{ left: "38%" }}>
        <MoleInHole scale={1.1} delay={0.9} />
      </div>
      <div className="px-ground__actor" style={{ left: "90%" }}>
        <MoleInHole scale={1.1} delay={0.4} />
      </div>
    </>
  );
}
