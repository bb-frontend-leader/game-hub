import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PixelIcon, PixelLogo, RankBadge } from "@/components/pixel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getLeaderboardService } from "@/core";
import { clearPerfil, type Perfil } from "@/lib/perfil";

const LEADERBOARD_SIZE = 5;

export function AppHeader({ perfil }: { perfil: Perfil }) {
  const [showBoard, setShowBoard] = useState(false);

  // Solo se pide al backend cuando el jugador abre el modal.
  const { data: entries, isLoading } = useQuery({
    queryKey: ["leaderboard", "global"],
    queryFn: () => getLeaderboardService().getGlobalLeaderboard(LEADERBOARD_SIZE),
    enabled: showBoard,
  });

  const logout = () => {
    toast.success("¡Hasta pronto!");
    setTimeout(() => clearPerfil(), 400);
  };

  return (
    <header className="relative z-20 border-b-4 border-ink bg-night-900 shadow-[inset_0_-4px_0_0_var(--px-night-700)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <Link to="/" aria-label="BooksQuest — inicio" className="shrink-0">
          <PixelLogo />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            variant="default"
            onClick={() => setShowBoard(true)}
            aria-label="Ver clasificación"
            className="px-btn--icon lg:px-5"
          >
            <PixelIcon name="trophy" scale={2} />
            <span className="hidden lg:inline">Clasificación</span>
          </Button>

          <div
            className="px-frame px-c-night hidden h-12 max-w-[12rem] items-center gap-2 px-2 min-[380px]:flex sm:px-3"
            title={perfil.name}
          >
            <span
              aria-hidden
              className="px-frame px-c-well flex size-8 shrink-0 items-center justify-center text-lg leading-none [--px:2px]"
            >
              {perfil.emoji}
            </span>
            <span className="hidden truncate text-lg font-semibold md:inline">{perfil.name}</span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={logout}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            <PixelIcon name="exit" scale={2} />
          </Button>
        </div>
      </div>

      <Dialog open={showBoard} onOpenChange={setShowBoard}>
        <DialogContent className="max-w-md gap-0 p-0">
          <div className="px-bar min-h-14 pr-14 [--px-bar-hi:var(--px-gold-hi)] [--px-bar:var(--px-gold)]">
            <PixelIcon name="trophy" scale={2} />
            <DialogTitle className="pr-0 text-base leading-snug text-ink">
              Tabla de clasificación
            </DialogTitle>
          </div>

          <div className="space-y-4 p-5">
            {isLoading && (
              <p
                role="status"
                className="animate-px-blink py-6 text-center text-xl text-muted-foreground"
              >
                Cargando...
              </p>
            )}
            {!isLoading && entries?.length === 0 && (
              <p className="py-6 text-center text-xl text-muted-foreground">
                ¡Todavía no hay puntajes! Sé el primero en jugar.
              </p>
            )}
            {!isLoading && entries && entries.length > 0 && (
              <ol className="space-y-3">
                {entries.map((entry) => (
                  <li
                    key={entry.userId}
                    className="px-frame px-c-night flex items-center gap-3 px-3 py-2 [--px:2px]"
                  >
                    <RankBadge rank={entry.rank} className="w-9 shrink-0" />
                    <span aria-hidden className="text-xl leading-none">
                      {entry.emoji}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-xl font-semibold">
                      {entry.name}
                    </span>
                    <span className="shrink-0 font-pixel text-base font-bold text-gold">
                      {entry.points} pts
                    </span>
                  </li>
                ))}
              </ol>
            )}
            <DialogDescription className="text-center text-lg">
              ¡Sigue jugando para subir de puesto!
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
