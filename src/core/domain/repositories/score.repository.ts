import type { GameId } from "@/core/domain/entities/game";

export type SubmitScoreInput = {
  userId: string;
  gameId: GameId;
  points: number;
};

// Port for submitting the score obtained from a game activity.
export interface ScoreRepository {
  submit(input: SubmitScoreInput): Promise<void>;
}
