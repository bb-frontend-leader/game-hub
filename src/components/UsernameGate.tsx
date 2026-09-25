import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { GroundParade, PixelGround, PixelIcon } from "@/components/pixel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserService } from "@/core";
import { type Perfil, randomEmoji, randomUsername, savePerfil } from "@/lib/perfil";

export function UsernameGate({ onJoin }: { onJoin: (perfil: Perfil) => void }) {
  const [name, setName] = useState("");

  const { mutate: join, isPending: isJoining } = useMutation({
    mutationFn: ({ name, emoji }: { name: string; emoji: string }) =>
      getUserService().createUser({ name, emoji }),
    onSuccess: (user) => onJoin(savePerfil(user)),
    onError: (error, { name, emoji }) => {
      // El backend puede no estar disponible todavía (o fallar): seguimos
      // dejando jugar con un perfil solo local, sin id de servidor.
      console.error(error);
      toast.error("No pudimos guardarte en el servidor, ¡pero puedes seguir jugando!");
      onJoin(savePerfil({ name, emoji }));
    },
  });

  const handleJoin = () => {
    const clean = name.trim();
    if (!clean || isJoining) return;
    join({ name: clean, emoji: randomEmoji() });
  };

  const surprise = () => {
    setName(randomUsername());
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-12 pt-10">
        <PixelIcon name="book" scale={6} className="animate-px-bob-big" />
        <h1 className="px-title animate-px-pop mt-8 max-w-3xl text-balance text-center text-[1.5rem] leading-snug sm:text-[2.5rem]">
          ¡Bienvenido a BooksQuest!
        </h1>
        <p
          className="animate-px-pop mt-6 flex items-center gap-3 text-center text-xl text-star sm:text-2xl"
          style={{ animationDelay: "0.15s" }}
        >
          <PixelIcon name="sparkle" scale={2} className="shrink-0 text-gold" />
          ¿Cuál es tu nombre de jugador?
        </p>

        <form
          className="px-frame px-c-deep px-drop animate-px-pop mt-8 w-full max-w-lg"
          style={{ animationDelay: "0.3s" }}
          onSubmit={(e) => {
            e.preventDefault();
            handleJoin();
          }}
        >
          <div className="px-bar [--px-bar-hi:var(--px-cyan-hi)] [--px-bar:var(--px-cyan)]">
            <PixelIcon name="star" scale={2} />
            Nueva partida
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              placeholder="Escribe tu nombre..."
              aria-label="Nombre de jugador"
              autoComplete="off"
            />

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button type="button" variant="secondary" onClick={surprise} className="flex-1">
                <PixelIcon name="dice" scale={2} />
                ¡Sorpréndeme!
              </Button>
              <Button
                type="submit"
                variant="success"
                disabled={!name.trim() || isJoining}
                className="flex-1"
              >
                <PixelIcon name="play" scale={2} />
                {isJoining ? "Entrando..." : "¡A jugar!"}
              </Button>
            </div>
          </div>
        </form>
      </main>

      <PixelGround>
        <GroundParade />
      </PixelGround>
    </div>
  );
}
