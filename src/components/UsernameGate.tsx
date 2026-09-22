import { Dices, Play, Sparkles } from "lucide-react";
import { useState } from "react";

import { type Perfil, randomUsername } from "@/lib/perfil";

const confetti = [
  { emoji: "⭐", top: "10%", left: "8%", size: "text-4xl", delay: "0s" },
  { emoji: "🎮", top: "20%", left: "88%", size: "text-5xl", delay: "0.8s" },
  { emoji: "🎈", top: "65%", left: "5%", size: "text-5xl", delay: "1.6s" },
  { emoji: "🎉", top: "78%", left: "90%", size: "text-4xl", delay: "0.4s" },
  { emoji: "⚡", top: "42%", left: "12%", size: "text-3xl", delay: "2s" },
  { emoji: "🏆", top: "50%", left: "92%", size: "text-4xl", delay: "1.2s" },
];

const bubbles = [
  "top-24 -left-16 size-72 bg-party-pink/40",
  "top-1/3 -right-20 size-80 bg-game-blue/40",
  "bottom-10 left-1/4 size-64 bg-game-green/30",
  "bottom-1/3 right-1/4 size-56 bg-party-orange/30",
];

export function UsernameGate({ onJoin }: { onJoin: (perfil: Perfil) => void }) {
  const [name, setName] = useState("");

  const join = () => {
    const clean = name.trim();
    if (!clean) return;
    // El emoji se sortea al entrar; import diferido para mantener la pantalla ligera.
    void import("@/lib/perfil").then(({ setPerfil }) => onJoin(setPerfil(clean)));
  };

  const surprise = () => {
    setName(randomUsername());
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className={`animate-floaty pointer-events-none absolute rounded-full blur-2xl ${b}`}
          style={{ animationDelay: `${i * 1.3}s` }}
        />
      ))}
      {confetti.map((c, i) => (
        <span
          key={i}
          className={`animate-floaty pointer-events-none absolute select-none ${c.size} opacity-80`}
          style={{ top: c.top, left: c.left, animationDelay: c.delay }}
        >
          {c.emoji}
        </span>
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-10">
        <span className="animate-bounce-soft text-6xl" aria-hidden>
          🕹️
        </span>
        <h1 className="animate-pop mt-4 text-center text-4xl font-bold drop-shadow-[0_4px_0_oklch(0.2_0.12_295)] sm:text-6xl">
          ¡Bienvenido a Juegolandia!
        </h1>
        <p
          className="animate-pop mt-3 flex items-center gap-2 text-center text-lg font-medium text-muted-foreground sm:text-xl"
          style={{ animationDelay: "0.15s" }}
        >
          <Sparkles className="size-5 text-game-yellow" />
          ¿Cuál es tu nombre de jugador?
        </p>

        <form
          className="animate-pop mt-8 w-full max-w-md rounded-4xl border-4 border-white/20 bg-card p-6 shadow-[0_14px_0_oklch(0.3_0.1_300)] sm:p-8"
          style={{ animationDelay: "0.3s" }}
          onSubmit={(e) => {
            e.preventDefault();
            join();
          }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            placeholder="Escribe tu nombre..."
            aria-label="Nombre de jugador"
            className="w-full rounded-2xl border-4 border-game-blue/40 bg-background px-4 py-3.5 text-lg font-semibold outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-game-green"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={surprise}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-party-orange px-4 py-3 font-bold text-primary-foreground shadow-[0_5px_0_oklch(0.55_0.19_55)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
            >
              <Dices className="size-5" strokeWidth={2.5} />
              ¡Sorpréndeme!
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-game-green px-4 py-3 font-bold text-primary-foreground shadow-[0_5px_0_oklch(0.45_0.17_150)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <Play className="size-5 fill-current" />
              ¡A jugar!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
