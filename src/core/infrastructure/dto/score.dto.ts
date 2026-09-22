import type { GameId } from "@/core/domain/entities/game";

// PLACEHOLDER_API_CONTRACT — wire format for POST {base}/scores.
export type SubmitScoreRequestDto = {
  userId: string;
  gameId: GameId;
  points: number;
};
