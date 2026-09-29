import type { GameId } from "@/core/domain/entities/game";
import type {
  GlobalLeaderboardEntry,
  LeaderboardEntry,
} from "@/core/domain/entities/leaderboard-entry";

// Port for querying leaderboard/ranking tables. `token` is the bearer token
// of whoever is asking (a registered player or an admin).
export interface LeaderboardRepository {
  getTop(token: string, gameId: GameId, limit?: number): Promise<LeaderboardEntry[]>;
  // Ranking of users by points summed across every game.
  getGlobalTop(token: string, limit?: number): Promise<GlobalLeaderboardEntry[]>;
}
