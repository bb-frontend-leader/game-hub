import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Brain } from "lucide-react";

import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/whack-a-question")({
  head: () => ({
    meta: [
      { title: "Whack a game — ¡Juegolandia!" },
      {
        name: "description",
        content: "Golpea la respuesta correcta a toda velocidad en Whack a game.",
      },
      { property: "og:title", content: "Whack a game — ¡Juegolandia!" },
      { property: "og:description", content: "Golpea rápido y suma puntos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhackAQuestion,
});

function WhackAQuestion() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="animate-floaty pointer-events-none absolute -left-16 top-1/3 size-72 rounded-full bg-game-blue/30 blur-2xl" />
      <div className="animate-floaty pointer-events-none absolute -right-20 bottom-16 size-80 rounded-full bg-game-green/25 blur-2xl" />

      <div className="relative z-10">
        <AppHeader />
        <main className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-16 pt-10 text-center">
          <Brain className="animate-wiggle size-20 text-game-blue" strokeWidth={2.5} />
          <h1 className="animate-pop mt-4 text-4xl font-bold drop-shadow-[0_4px_0_oklch(0.2_0.12_295)] sm:text-5xl">
            Whack a game
          </h1>
          <p className="mt-3 text-lg font-medium text-muted-foreground">
            ¡Casi listo! Muy pronto podrás golpear las respuestas correctas antes de que se escapen.
            🔨❓
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-game-yellow px-6 py-3 font-bold text-primary-foreground shadow-[0_5px_0_oklch(0.62_0.15_95)] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
          >
            <ArrowLeft className="size-5" strokeWidth={2.5} />
            Volver a los juegos
          </Link>
        </main>
      </div>
    </div>
  );
}
