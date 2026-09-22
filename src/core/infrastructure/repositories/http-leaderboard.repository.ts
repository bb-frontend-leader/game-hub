import type { GameId } from "@/core/domain/entities/game";
import type { LeaderboardEntry } from "@/core/domain/entities/leaderboard-entry";
import type { LeaderboardRepository } from "@/core/domain/repositories/leaderboard.repository";
import { fetchApiDataSource } from "@/core/infrastructure/datasources/fetch-api.datasource";
import {
  type LeaderboardEntryDto,
  leaderboardEntryFromDto,
} from "@/core/infrastructure/dto/leaderboard.dto";

// PLACEHOLDER_API_CONTRACT: GET {base}/leaderboard?gameId=...&limit=...
const LEADERBOARD_PATH = "/leaderboard";

export class HttpLeaderboardRepository implements LeaderboardRepository {
  async getTop(gameId: GameId, limit?: number): Promise<LeaderboardEntry[]> {
    const dtos = await fetchApiDataSource.get<LeaderboardEntryDto[]>(LEADERBOARD_PATH, {
      gameId,
      limit,
    });
    return dtos.map(leaderboardEntryFromDto);
  }
}
