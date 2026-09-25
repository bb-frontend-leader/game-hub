import { createFileRoute } from "@tanstack/react-router";

import { GameWhackAQuestion } from "@/components/games/game-whack-a-question";
import { GameShell } from "@/components/GameShell";
import { dataGameWhackAQuestion } from "@/data-test";

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

function WhackAQuestion() {
  return (
    <GameShell title="Whack a game" accent="blue" className="max-w-3xl">
      <GameWhackAQuestion data={dataGameWhackAQuestion} />
    </GameShell>
  );
}
