import { MoleInHole, PixelSprite, SHEETS } from "./pixel-sprite";

// Escenas de las tarjetas del menú. Se arman con el arte real de cada juego
// (fondos y sprites de public/assets) a tamaño nativo o escala entera, así los
// píxeles se ven idénticos a los del juego.

export function TempleScene() {
  return (
    <div aria-hidden className="px-scene px-scene--temple">
      <div className="px-scene__layer px-scene__bg" />
      {/* Mago rojo de guardia y una planta hostiles. */}
      <div className="px-scene__actor" style={{ left: "4%", bottom: 60 }}>
        <PixelSprite sheet={SHEETS.hero} scale={3} frames={2} fps={2} />
      </div>
      <div className="px-scene__actor" style={{ left: "40%", bottom: 30 }}>
        <PixelSprite sheet={SHEETS.plant} scale={2} frames={4} fps={4} flip />
      </div>
      <div className="px-scene__layer px-scene__shade" />
    </div>
  );
}

export function WhackScene() {
  return (
    <div aria-hidden className="px-scene px-scene--whack">
      <div className="px-scene__layer px-scene__clouds" />
      <div className="px-scene__layer px-scene__grass" />
      <div className="px-scene__actor" style={{ left: "4%", bottom: 14 }}>
        <MoleInHole scale={2} delay={0} />
      </div>
      <div className="px-scene__actor" style={{ left: "36%", bottom: 40 }}>
        <MoleInHole scale={2} delay={1.4} />
      </div>
      <div className="px-scene__actor" style={{ left: "68%", bottom: 14 }}>
        <MoleInHole scale={2} delay={2.5} />
      </div>
      <div className="px-scene__layer px-scene__shade" />
    </div>
  );
}
