import type { GameId } from "@/core/domain/entities/game";
import type { User } from "@/core/domain/entities/user";

export type SubmitScoreInput = {
  userId: string;
  gameId: GameId;
  points: number;
};

// Port for submitting the score obtained from a game activity. `token` is the
// player's bearer token; it must belong to `input.userId`. Each player gets a
// single score per game: a second submission is rejected (409).
export interface ScoreRepository {
  // Resolves with the player as updated by the backend.
  submit(token: string, input: SubmitScoreInput): Promise<User>;
}
