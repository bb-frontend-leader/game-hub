import type { GameId } from "@/core/domain/entities/game";

// One ranked row of a game's leaderboard, as computed by the backend.
export type LeaderboardEntry = {
  userId: string;
  name: string;
  emoji: string;
  gameId: GameId;
  points: number;
  rank: number;
};
