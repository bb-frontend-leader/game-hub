import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { LogOut, Medal, Rocket, Trophy, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { getLeaderboardService } from "@/core";
import { clearPerfil, type Perfil } from "@/lib/perfil";

const LEADERBOARD_SIZE = 5;

// Medal emoji for the top 3 ranks, plain rank number otherwise.
function medalFor(rank: number): string {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return String(rank);
}

export function AppHeader({ perfil }: { perfil: Perfil }) {
  const [showBoard, setShowBoard] = useState(false);

  // Solo se pide al backend cuando el jugador abre el modal.
  const { data: entries, isLoading } = useQuery({
    queryKey: ["leaderboard", "global"],
    queryFn: () => getLeaderboardService().getGlobalLeaderboard(LEADERBOARD_SIZE),
    enabled: showBoard,
  });

  const logout = () => {
    toast.success("¡Hasta pronto! 👋");
    setTimeout(() => clearPerfil(), 400);
  };

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-5 py-4 sm:px-8">
      {/* Right: logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-bold tracking-tight drop-shadow-[0_3px_0_oklch(0.2_0.12_295)] sm:text-3xl"
      >
        <Rocket className="size-8 text-game-yellow animate-wiggle" strokeWidth={2.5} />
        ¡Juegolandia!
      </Link>

      {/* Left: leaderboard, avatar, logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setShowBoard(true)}
          className="flex items-center gap-2 rounded-2xl bg-game-yellow px-3 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_5px_0_oklch(0.62_0.15_95)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-1 active:shadow-none sm:px-4"
        >
          <Trophy className="size-5" strokeWidth={2.5} />
          <span className="hidden sm:inline">Clasificación</span>
        </button>

        <div className="flex h-11 max-w-[9rem] items-center gap-1.5 overflow-hidden rounded-sm border-4 border-white/30 bg-party-pink px-2 text-lg">
          <span aria-hidden>{perfil.emoji}</span>
          <span className="truncate text-sm font-bold">{perfil.name}</span>
        </div>

        <button
          onClick={logout}
          title="Cerrar sesión"
          className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-[0_4px_0_oklch(0.3_0.14_300)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <LogOut className="size-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Leaderboard modal */}
      {showBoard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowBoard(false)}
        >
          <div
            className="animate-pop w-full max-w-md rounded-3xl border-4 border-white/20 bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <Trophy className="size-7 text-game-yellow" />
                Tabla de clasificación
              </h2>
              <button
                onClick={() => setShowBoard(false)}
                aria-label="Cerrar clasificación"
                className="flex size-9 items-center justify-center rounded-full bg-muted transition-transform hover:scale-110"
              >
                <X className="size-5" />
              </button>
            </div>
            {isLoading && (
              <p className="py-6 text-center text-sm text-muted-foreground">Cargando...</p>
            )}
            {!isLoading && entries?.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                ¡Todavía no hay puntajes! Sé el primero en jugar 🎮
              </p>
            )}
            {!isLoading && entries && entries.length > 0 && (
              <ul className="space-y-2">
                {entries.map((entry) => (
                  <li
                    key={entry.userId}
                    className="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3"
                  >
                    <span className="flex size-9 items-center justify-center text-xl font-bold">
                      {medalFor(entry.rank)}
                    </span>
                    <Medal className="size-4 text-game-yellow" />
                    <span className="flex-1 font-semibold">
                      {entry.emoji} {entry.name}
                    </span>
                    <span className="font-bold text-game-yellow">{entry.points} pts</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-center text-sm text-muted-foreground">
              ¡Sigue jugando para subir de puesto!
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
