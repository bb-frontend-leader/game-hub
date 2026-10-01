import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

import { type GameResult, GameWhackAQuestion } from "@/components/games/game-whack-a-question";
import { GameShell } from "@/components/GameShell";
import { ApiError, type GameId, getScoreService } from "@/core";
import { dataGameWhackAQuestion } from "@/data-test";
import { usePerfil } from "@/lib/perfil-context";

export const Route = createFileRoute("/whack-a-question")({
  head: () => ({
    meta: [
      { title: "Whack a game — BooksQuest" },
      {
        name: "description",
        content: "Golpea la respuesta correcta a toda velocidad en Whack a game.",
      },
      { property: "og:title", content: "Whack a game — BooksQuest" },
      { property: "og:description", content: "Golpea rápido y suma puntos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhackAQuestion,
});

const GAME_ID: GameId = "whack-a-question";

function WhackAQuestion() {
  const perfil = usePerfil();
  // Ausente (undefined) = todavía no jugado: se muestra el puntaje en vivo
  // (el estado `score` de abajo). Presente = ya se guardó en el backend: se
  // muestra ese puntaje, de solo lectura (cada juego se puntúa una sola vez).
  const savedPoints = perfil.scores?.[GAME_ID] ?? null;
  const submitScore = useSubmitScore();
  const [score, setScore] = useState(0);

  const handleResult = useCallback(
    (result: GameResult) => {
      setScore(result.score);
      if (result.isGameFinished) submitScore(result.score);
    },
    [submitScore],
  );

  return (
    <GameShell
      title="Whack a game"
      accent="blue"
      className="max-w-3xl"
      score={savedPoints ?? score}
    >
      <GameWhackAQuestion data={dataGameWhackAQuestion} onResult={handleResult} />
    </GameShell>
  );
}

function useSubmitScore() {
  const perfil = usePerfil();
  const queryClient = useQueryClient();

  // idle = no enviado · sending = en curso · done = ya registrado
  const statusRef = useRef<"idle" | "sending" | "done">("idle");

  const { mutate } = useMutation({
    mutationFn: (points: number) => {
      if (!perfil.token || !perfil.id) {
        throw new Error("Perfil sin id/token: solo local, no registrado en el backend");
      }
      return getScoreService().submitScore(perfil.token, {
        userId: perfil.id,
        gameId: GAME_ID,
        points,
      });
    },
    onSuccess: (user, points) => {
      statusRef.current = "done";
      toast.success(`¡${points} puntos guardados para ${user.name}!`);
      void queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      void queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          statusRef.current = "done"; // el backend dice que ya existe
          toast.info("Ya registraste tu puntaje en este juego");
          return;
        }
        statusRef.current = "idle"; // permite reintentar
        toast.error(
          error.status === 401 ? "Token vencido o inválido" : `Error ${error.status ?? "de red"}`,
        );
        return;
      }
      statusRef.current = "idle";
      toast.error(error.message);
    },
  });

  return useCallback(
    (points: number) => {
      if (statusRef.current === "sending") return; // evita doble envío
      if (statusRef.current === "done") {
        toast.info("Ya registraste tu puntaje en este juego");
        return;
      }
      statusRef.current = "sending";
      mutate(points);
    },
    [mutate],
  );
}
