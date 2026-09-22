import type { GameId } from "@/core/domain/entities/game";

// A single score submission for one game activity.
export type Score = {
  userId: string;
  gameId: GameId;
  points: number;
};
