import { AttackGame } from "@games/game-temple-of-knowledge/attack-game";
import { createFileRoute } from "@tanstack/react-router";

import { GameShell } from "@/components/GameShell";
import { TEMPLE_OF_KNOWLEDGE_QUESTIONS } from "@/data-test";

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

function TempleOfKnowledge() {
  return (
    <GameShell title="Temple of Knowledge" accent="red" className="max-w-4xl">
      <AttackGame questions={TEMPLE_OF_KNOWLEDGE_QUESTIONS} />
    </GameShell>
  );
}
