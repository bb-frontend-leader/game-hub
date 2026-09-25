import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { PixelGround, PixelIcon } from "@/components/pixel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCENTS = {
  red: "[--px-bar-hi:var(--px-red-hi)] [--px-bar:var(--px-red)]",
  blue: "[--px-bar-hi:var(--px-blue-hi)] [--px-bar:var(--px-blue)]",
} as const;

// Marco común de las páginas de juego: botón de regreso y una "ventana arcade"
// con barra de título que contiene el canvas de Phaser. El ancho máximo (`className`)
// lo elige cada juego, porque Phaser escala el canvas (Scale.FIT) al ancho del
// contenedor.
export function GameShell({
  title,
  accent,
  className,
  children,
}: {
  title: string;
  accent: keyof typeof ACCENTS;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col overflow-x-clip">
      <main
        className={cn(
          "mx-auto flex w-full flex-1 flex-col gap-6 px-4 pb-14 pt-6 sm:pt-8",
          className,
        )}
      >
        <div>
          <Link to="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <PixelIcon name="arrow-left" scale={2} />
            Volver a los juegos
          </Link>
        </div>

        <section className="px-frame px-c-deep px-drop animate-px-pop">
          <div className={`px-bar ${ACCENTS[accent]}`}>
            <PixelIcon name="star" scale={2} />
            <h1 className="leading-snug">{title}</h1>
          </div>
          <div className="bg-night-950">{children}</div>
        </section>
      </main>

      <PixelGround />
    </div>
  );
}
