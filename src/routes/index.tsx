import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import memoriaImg from "@/assets/juego-memoria.png";
import triviaImg from "@/assets/juego-trivia.png";
import { AppHeader } from "@/components/AppHeader";
import { UsernameGate } from "@/components/UsernameGate";
import { getPerfil, type Perfil } from "@/lib/perfil";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "¡Juegolandia! — Elige tu juego" },
      {
        name: "description",
        content:
          "Página de juegos llena de color y animación: elige entre Trivia Relámpago y Memoria Animal.",
      },
      { property: "og:title", content: "¡Juegolandia! — Elige tu juego" },
      {
        property: "og:description",
        content: "Dos juegos, mil risas: trivia a toda velocidad y memoria de animales.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const confetti = [
  { emoji: "⭐", top: "12%", left: "6%", size: "text-4xl", delay: "0s" },
  { emoji: "❓", top: "22%", left: "88%", size: "text-5xl", delay: "0.8s" },
  { emoji: "🎈", top: "62%", left: "4%", size: "text-5xl", delay: "1.6s" },
  { emoji: "🎉", top: "75%", left: "92%", size: "text-4xl", delay: "0.4s" },
  { emoji: "⚡", top: "40%", left: "10%", size: "text-3xl", delay: "2s" },
  { emoji: "🧠", top: "48%", left: "90%", size: "text-4xl", delay: "1.2s" },
];

const bubbles = [
  "top-24 -left-16 size-72 bg-party-pink/40",
  "top-1/3 -right-20 size-80 bg-game-blue/40",
  "bottom-10 left-1/4 size-64 bg-game-green/30",
  "bottom-1/3 right-1/4 size-56 bg-party-orange/30",
];

const games = [
  {
    to: "/juego-trivia",
    name: "Trivia Relámpago",
    tagline: "Responde rápido y suma puntos",
    image: triviaImg,
    card: "bg-game-red",
    shadow: "shadow-[0_18px_0_oklch(0.42_0.2_20)]",
    delay: "0.1s",
  },
  {
    to: "/juego-memoria",
    name: "Memoria Animal",
    tagline: "Encuentra las parejas de animales",
    image: memoriaImg,
    card: "bg-game-blue",
    shadow: "shadow-[0_18px_0_oklch(0.4_0.17_255)]",
    delay: "0.25s",
  },
];

function Index() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  useEffect(() => {
    setPerfil(getPerfil());
    const onLogout = () => setPerfil(null);
    window.addEventListener("juegolandia:logout", onLogout);
    return () => window.removeEventListener("juegolandia:logout", onLogout);
  }, []);

  if (!perfil) return <UsernameGate onJoin={setPerfil} />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient bubbles */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className={`animate-floaty pointer-events-none absolute rounded-full blur-2xl ${b}`}
          style={{ animationDelay: `${i * 1.3}s` }}
        />
      ))}

      {/* Floating confetti emojis */}
      {confetti.map((c, i) => (
        <span
          key={i}
          className={`animate-floaty pointer-events-none absolute select-none ${c.size} opacity-80`}
          style={{ top: c.top, left: c.left, animationDelay: c.delay }}
        >
          {c.emoji}
        </span>
      ))}

      <div className="relative z-10">
        <AppHeader perfil={perfil} />

        <main className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-16 pt-6 sm:pt-10">
          <h1 className="animate-pop text-center text-4xl font-bold drop-shadow-[0_4px_0_oklch(0.2_0.12_295)] sm:text-6xl">
            ¡Hola, {perfil.name}! Elige tu juego
          </h1>
          <p
            className="animate-pop mt-3 text-center text-lg font-medium text-muted-foreground sm:text-xl"
            style={{ animationDelay: "0.15s" }}
          >
            Dos aventuras te esperan. ¿Con cuál empiezas? 👇
          </p>

          <div className="mt-10 grid w-full gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-10">
            {games.map((game) => (
              <Link
                key={game.to}
                to={game.to}
                className="animate-pop group block"
                style={{ animationDelay: game.delay }}
              >
                <div
                  className={`overflow-hidden rounded-4xl border-4 border-white/20 ${game.card} ${game.shadow} transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-1`}
                >
                  <div className="overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5 text-center sm:p-6">
                    <h2 className="text-2xl font-bold sm:text-3xl">{game.name}</h2>
                    <p className="mt-1 text-sm font-medium text-white/85 sm:text-base">
                      {game.tagline}
                    </p>
                    <span className="animate-bounce-soft mt-4 inline-flex items-center gap-2 rounded-2xl bg-game-yellow px-6 py-3 text-lg font-bold text-primary-foreground shadow-[0_5px_0_oklch(0.62_0.15_95)] transition-transform duration-150 group-hover:animate-wiggle">
                      <Play className="size-5 fill-current" />
                      ¡Jugar!
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
