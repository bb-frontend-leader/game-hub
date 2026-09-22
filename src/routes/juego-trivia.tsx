import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Zap } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/juego-trivia")({
  head: () => ({
    meta: [
      { title: "Trivia Relámpago — ¡Juegolandia!" },
      {
        name: "description",
        content: "Responde preguntas a toda velocidad y suma puntos en Trivia Relámpago.",
      },
      { property: "og:title", content: "Trivia Relámpago — ¡Juegolandia!" },
      { property: "og:description", content: "Responde rápido y suma puntos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TriviaPage,
});

function TriviaPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="animate-floaty pointer-events-none absolute -left-20 top-1/4 size-80 rounded-full bg-game-red/30 blur-2xl" />
      <div className="animate-floaty pointer-events-none absolute -right-16 bottom-10 size-72 rounded-full bg-party-orange/30 blur-2xl" />

      <div className="relative z-10">
        <AppHeader />
        <main className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-16 pt-10 text-center">
          <Zap className="animate-wiggle size-20 text-game-yellow" strokeWidth={2.5} />
          <h1 className="animate-pop mt-4 text-4xl font-bold drop-shadow-[0_4px_0_oklch(0.2_0.12_295)] sm:text-5xl">
            Trivia Relámpago
          </h1>
          <p className="mt-3 text-lg font-medium text-muted-foreground">
            ¡Este juego se está preparando! Muy pronto podrás responder preguntas
            contra el reloj. ⏱️
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
