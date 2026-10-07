import { AttackGame } from "@games/game-temple-of-knowledge/attack-game";
import { GameResult } from "@games/game-temple-of-knowledge/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

import { GameShell } from "@/components/GameShell";
import { ApiError, type GameId, getScoreService } from "@/core";
import { TEMPLE_OF_KNOWLEDGE_QUESTIONS } from "@/data-test";
import { usePerfil } from "@/lib/perfil-context";

export const Route = createFileRoute("/temple-of-knowledge")({
  head: () => ({
    meta: [
      { title: "Temple of Knowledge — BooksQuest" },
      {
        name: "description",
        content: "Responde preguntas a toda velocidad y suma puntos en Temple of Knowledge.",
      },
      { property: "og:title", content: "Temple of Knowledge — BooksQuest" },
      { property: "og:description", content: "Responde rápido y suma puntos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TempleOfKnowledge,
});

const GAME_ID: GameId = "temple-of-knowledge";

function TempleOfKnowledge() {
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
      title="Temple of Knowledge"
      accent="red"
      className="max-w-5xl"
      score={savedPoints ?? score}
    >
      <AttackGame questions={TEMPLE_OF_KNOWLEDGE_QUESTIONS} onResult={handleResult} />
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
