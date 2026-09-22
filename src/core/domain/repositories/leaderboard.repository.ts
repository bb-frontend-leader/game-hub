import type { GameId } from "@/core/domain/entities/game";
import type { LeaderboardEntry } from "@/core/domain/entities/leaderboard-entry";

// Port for querying a single game's leaderboard/ranking table.
export interface LeaderboardRepository {
  getTop(gameId: GameId, limit?: number): Promise<LeaderboardEntry[]>;
}
