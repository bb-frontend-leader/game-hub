import { AttackGame } from "@games/game-temple-of-knowledge/attack-game";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
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
  const submitScore = useSubmitScore();

  return (
    <GameShell title="Temple of Knowledge" accent="red" className="max-w-4xl">
      <AttackGame
        questions={TEMPLE_OF_KNOWLEDGE_QUESTIONS}
        onResult={(result) => {
          if (result.isGameFinished) submitScore(result.score);
        }}
      />
    </GameShell>
  );
}

// function SubmitScoreTestButton() {
//   const perfil = usePerfil();
//   const queryClient = useQueryClient();
//   const [points, setPoints] = useState("50");

//   const { mutate: submit, isPending } = useMutation({
//     mutationFn: () => {
//       if (!perfil.token || !perfil.id) {
//         throw new Error("Perfil sin id/token: solo local, no registrado en el backend");
//       }
//       return getScoreService().submitScore(perfil.token, {
//         userId: perfil.id,
//         gameId: GAME_ID,
//         points: Number(points),
//       });
//     },
//     onSuccess: (user) => {
//       console.info("[test] puntaje enviado", user);
//       toast.success(`Puntaje guardado para ${user.name}`);
//       void queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
//     },
//     onError: (error) => {
//       console.error("[test] error al enviar puntaje", error);
//       if (error instanceof ApiError) {
//         const message =
//           error.status === 409
//             ? "Ya registraste tu puntaje en este juego"
//             : error.status === 401
//               ? "Token vencido o inválido"
//               : `Error ${error.status ?? "de red"}`;
//         toast.error(message);
//         return;
//       }
//       toast.error(error.message);
//     },
//   });

//   return (
//     <form
//       className="flex items-center gap-3 border-t-4 border-dashed border-ink p-4"
//       onSubmit={(e) => {
//         e.preventDefault();
//         if (!isPending) submit();
//       }}
//     >
//       <span className="shrink-0 text-lg text-muted-foreground">[Prueba] Puntos:</span>
//       <Input
//         type="number"
//         value={points}
//         onChange={(e) => setPoints(e.target.value)}
//         aria-label="Puntos de prueba"
//         className="w-28"
//       />
//       <Button type="submit" variant="secondary" disabled={isPending}>
//         {isPending ? "Enviando..." : "Enviar puntaje"}
//       </Button>
//     </form>
//   );
// }

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
