import { GetLeaderboardUseCase } from "@/core/application/use-cases/get-leaderboard.use-case";
import type { GameId } from "@/core/domain/entities/game";
import type { LeaderboardEntry } from "@/core/domain/entities/leaderboard-entry";
import type { LeaderboardRepository } from "@/core/domain/repositories/leaderboard.repository";

export class LeaderboardService {
  private readonly getLeaderboardUseCase: GetLeaderboardUseCase;

  constructor(leaderboardRepository: LeaderboardRepository) {
    this.getLeaderboardUseCase = new GetLeaderboardUseCase(leaderboardRepository);
  }

  async getLeaderboard(gameId: GameId, limit?: number): Promise<LeaderboardEntry[]> {
    return this.getLeaderboardUseCase.execute(gameId, limit);
  }
}
