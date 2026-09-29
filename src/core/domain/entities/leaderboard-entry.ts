import type { GameId } from "@/core/domain/entities/game";

// One ranked row of a game's leaderboard. The backend doesn't store the
// player's emoji, so entries only carry the username.
export type LeaderboardEntry = {
  userId: string;
  name: string;
  gameId: GameId;
  points: number;
  rank: number;
};

// One ranked row of the global leaderboard: a user's points summed across
// every game, so it carries no gameId.
export type GlobalLeaderboardEntry = {
  userId: string;
  name: string;
  points: number;
  rank: number;
};
