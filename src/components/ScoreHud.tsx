import { PixelIcon } from "./pixel";

// Marcador estilo arcade: icono en un "pozo" + etiqueta pequeña + número dorado.
export function ScoreHud({ score }: { score: number }) {
  return (
    <div className="px-frame px-c-night flex items-center gap-3 py-1.5 pl-1.5 pr-4">
      <span className="sr-only">Puntaje: {score} puntos</span>

      <span
        aria-hidden
        className="px-frame px-c-well flex size-10 shrink-0 items-center justify-center [--px:2px]"
      >
        <PixelIcon name="trophy" scale={2} />
      </span>

      <span aria-hidden className="flex flex-col gap-1 leading-none">
        <span className="font-pixel text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
          Puntaje
        </span>
        <span className="flex items-baseline gap-1">
          <span
            key={score}
            className="animate-px-pop min-w-[3ch] font-pixel text-xl font-bold tabular-nums text-gold"
          >
            {score}
          </span>
          <span className="font-pixel text-[0.6rem] uppercase text-muted-foreground">pts</span>
        </span>
      </span>
    </div>
  );
}
