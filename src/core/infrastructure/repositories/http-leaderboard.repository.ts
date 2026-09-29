import type { GameId } from "@/core/domain/entities/game";
import type {
  GlobalLeaderboardEntry,
  LeaderboardEntry,
} from "@/core/domain/entities/leaderboard-entry";
import type { LeaderboardRepository } from "@/core/domain/repositories/leaderboard.repository";
import { fetchApiDataSource } from "@/core/infrastructure/datasources/fetch-api.datasource";
import {
  globalLeaderboardFromDto,
  leaderboardFromDto,
  type RankingResponseDto,
} from "@/core/infrastructure/dto/leaderboard.dto";

// GET {base}/ranking[?limit=N]. It accepts `limit` but includes admins in the
// result and can't sort by a single game, so the whole list is fetched and
// filtered/sorted/cut client-side.
const RANKING_PATH = "/ranking";

export class HttpLeaderboardRepository implements LeaderboardRepository {
  async getTop(token: string, gameId: GameId, limit?: number): Promise<LeaderboardEntry[]> {
    const dto = await fetchApiDataSource.get<RankingResponseDto>(RANKING_PATH, undefined, {
      token,
    });
    return leaderboardFromDto(dto, gameId, limit);
  }

  async getGlobalTop(token: string, limit?: number): Promise<GlobalLeaderboardEntry[]> {
    const dto = await fetchApiDataSource.get<RankingResponseDto>(RANKING_PATH, undefined, {
      token,
    });
    return globalLeaderboardFromDto(dto, limit);
  }
}
