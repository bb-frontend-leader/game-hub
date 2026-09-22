import type { GameId } from "@/core/domain/entities/game";
import type {
  GlobalLeaderboardEntry,
  LeaderboardEntry,
} from "@/core/domain/entities/leaderboard-entry";

// Port for querying leaderboard/ranking tables.
export interface LeaderboardRepository {
  getTop(gameId: GameId, limit?: number): Promise<LeaderboardEntry[]>;
  // Ranking of users by points summed across every game.
  getGlobalTop(limit?: number): Promise<GlobalLeaderboardEntry[]>;
}
