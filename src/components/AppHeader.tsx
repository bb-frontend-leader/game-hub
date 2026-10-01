import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PixelIcon, PixelLogo, RankBadge } from "@/components/pixel";
import { PlayerCode } from "@/components/PlayerCode";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getLeaderboardService, getUserService } from "@/core";
import { clearPerfil, type Perfil } from "@/lib/perfil";

const LEADERBOARD_SIZE = 5;

export function AppHeader({ perfil }: { perfil: Perfil }) {
  const [showBoard, setShowBoard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Solo se pide al backend cuando el jugador abre el modal. Requiere el token
  // del registro: un perfil solo local (sin token) no puede ver la tabla.
  const token = perfil.token;
  const {
    data: entries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["leaderboard", "global", LEADERBOARD_SIZE],
    queryFn: () => getLeaderboardService().getGlobalLeaderboard(token!, LEADERBOARD_SIZE),
    enabled: showBoard && !!token,
  });

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Invalida el token en el backend y luego borra el perfil local. Si la
  // llamada falla (sin red, token ya vencido) se cierra la sesión igual.
  const logout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    if (perfil.token) {
      try {
        await getUserService().logoutUser(perfil.token);
      } catch (error) {
        console.warn("No se pudo cerrar la sesión en el servidor", error);
      }
    }
    // Sin token ya no hay vuelta atrás: le recordamos su código para entrar.
    toast.success(
      perfil.code
        ? `¡Hasta pronto! Para volver usa tu nombre y el código ${perfil.code}`
        : "¡Hasta pronto!",
      { duration: 8000 },
    );
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

          <button
            type="button"
            onClick={() => setShowProfile(true)}
            aria-label={`Mi perfil: ${perfil.name}`}
            className="px-frame px-c-night hidden h-12 max-w-[12rem] items-center gap-2 px-2 transition-transform duration-100 ease-[steps(2)] hover:-translate-y-0.5 min-[380px]:flex sm:px-3"
            title="Ver mi perfil y mi código"
          >
            <span
              aria-hidden
              className="px-frame px-c-well flex size-8 shrink-0 items-center justify-center text-lg leading-none [--px:2px]"
            >
              {perfil.emoji}
            </span>
            <span className="hidden truncate text-lg font-semibold md:inline">{perfil.name}</span>
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                disabled={isLoggingOut}
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
              >
                <PixelIcon name="exit" scale={2} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className="space-y-4">
                    {perfil.code ? (
                      <>
                        <p>
                          Para volver a entrar necesitarás tu nombre{" "}
                          <strong className="text-foreground">{perfil.name}</strong> y este código:
                        </p>
                        <PlayerCode code={perfil.code} />
                      </>
                    ) : (
                      <p>
                        Tu jugador no está guardado en el servidor: si cierras sesión, no podrás
                        recuperarlo.
                      </p>
                    )}
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Seguir jugando</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={() => void logout()}>
                  Cerrar sesión
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-md gap-0 p-0">
          <div className="px-bar min-h-14 pr-14 [--px-bar-hi:var(--px-cyan-hi)] [--px-bar:var(--px-cyan)]">
            <PixelIcon name="shield" scale={2} />
            <DialogTitle className="pr-0 text-base leading-snug text-ink">Mi perfil</DialogTitle>
          </div>

          <div className="space-y-5 p-5 text-center">
            <p className="flex items-center justify-center gap-3 text-2xl font-semibold">
              <span aria-hidden className="text-3xl leading-none">
                {perfil.emoji}
              </span>
              {perfil.name}
            </p>
            {perfil.code ? (
              <>
                <DialogDescription className="text-lg">
                  Tu código para volver a entrar:
                </DialogDescription>
                <PlayerCode code={perfil.code} />
                <p className="text-base text-muted-foreground">
                  ¡No se lo muestres a nadie! Si lo olvidas, tu profe puede dártelo.
                </p>
              </>
            ) : (
              <DialogDescription className="text-lg">
                Tu jugador no está guardado en el servidor, así que no tiene código.
              </DialogDescription>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
            {(!token || isError) && (
              <p className="py-6 text-center text-xl text-muted-foreground">
                No pudimos cargar la clasificación. ¡Inténtalo más tarde!
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
