import type { GameId } from "@/core/domain/entities/game";
import type {
  GlobalLeaderboardEntry,
  LeaderboardEntry,
} from "@/core/domain/entities/leaderboard-entry";
import type { LeaderboardRepository } from "@/core/domain/repositories/leaderboard.repository";
import { fetchApiDataSource } from "@/core/infrastructure/datasources/fetch-api.datasource";
import {
  type GlobalLeaderboardEntryDto,
  globalLeaderboardEntryFromDto,
  type LeaderboardEntryDto,
  leaderboardEntryFromDto,
} from "@/core/infrastructure/dto/leaderboard.dto";

// PLACEHOLDER_API_CONTRACT: GET {base}/leaderboard?gameId=...&limit=...
const LEADERBOARD_PATH = "/leaderboard";
// PLACEHOLDER_API_CONTRACT: GET {base}/leaderboard/global?limit=...
const GLOBAL_LEADERBOARD_PATH = "/leaderboard/global";

export class HttpLeaderboardRepository implements LeaderboardRepository {
  async getTop(gameId: GameId, limit?: number): Promise<LeaderboardEntry[]> {
    const dtos = await fetchApiDataSource.get<LeaderboardEntryDto[]>(LEADERBOARD_PATH, {
      gameId,
      limit,
    });
    return dtos.map(leaderboardEntryFromDto);
  }

  async getGlobalTop(limit?: number): Promise<GlobalLeaderboardEntry[]> {
    const dtos = await fetchApiDataSource.get<GlobalLeaderboardEntryDto[]>(
      GLOBAL_LEADERBOARD_PATH,
      { limit },
    );
    return dtos.map(globalLeaderboardEntryFromDto);
  }
}
