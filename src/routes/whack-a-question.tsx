import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GameWhackAQuestion,
  type GameResult,
} from "@/components/games/game-whack-a-question";
import { GameShell } from "@/components/GameShell";
import { dataGameWhackAQuestion } from "@/data-test";
import { ApiError, type GameId, getLeaderboardService, getScoreService } from "@/core";
import { usePerfil } from "@/lib/perfil-context";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

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
const LEADERBOARD_LOOKUP_SIZE = 100;

function WhackAQuestion() {
  const savedPoints = useSavedPoints();
  const submitScore = useSubmitScore();
  const [score, setScore] = useState(15);

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

function useSavedPoints() {
  const perfil = usePerfil();

  const { data: entries } = useQuery({
    // empieza por "leaderboard" → se refresca solo tras guardar puntos
    queryKey: ["leaderboard", "global", LEADERBOARD_LOOKUP_SIZE],
    queryFn: () =>
      getLeaderboardService().getGlobalLeaderboard(perfil.token!, LEADERBOARD_LOOKUP_SIZE),
    enabled: !!perfil.token,
  });

  return entries?.find((entry) => entry.userId === perfil.id)?.points ?? null;
}