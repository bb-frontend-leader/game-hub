import { GetGlobalLeaderboardUseCase } from "@/core/application/use-cases/get-global-leaderboard.use-case";
import { GetLeaderboardUseCase } from "@/core/application/use-cases/get-leaderboard.use-case";
import type { GameId } from "@/core/domain/entities/game";
import type {
  GlobalLeaderboardEntry,
  LeaderboardEntry,
} from "@/core/domain/entities/leaderboard-entry";
import type { LeaderboardRepository } from "@/core/domain/repositories/leaderboard.repository";

export class LeaderboardService {
  private readonly getLeaderboardUseCase: GetLeaderboardUseCase;
  private readonly getGlobalLeaderboardUseCase: GetGlobalLeaderboardUseCase;

  constructor(leaderboardRepository: LeaderboardRepository) {
    this.getLeaderboardUseCase = new GetLeaderboardUseCase(leaderboardRepository);
    this.getGlobalLeaderboardUseCase = new GetGlobalLeaderboardUseCase(leaderboardRepository);
  }

  async getLeaderboard(gameId: GameId, limit?: number): Promise<LeaderboardEntry[]> {
    return this.getLeaderboardUseCase.execute(gameId, limit);
  }

  async getGlobalLeaderboard(limit?: number): Promise<GlobalLeaderboardEntry[]> {
    return this.getGlobalLeaderboardUseCase.execute(limit);
  }
}
