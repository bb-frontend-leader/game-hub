import type { GlobalLeaderboardEntry } from "@/core/domain/entities/leaderboard-entry";
import type { LeaderboardRepository } from "@/core/domain/repositories/leaderboard.repository";

// Queries the ranking of users by points summed across every game.
export class GetGlobalLeaderboardUseCase {
  constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

  async execute(limit?: number): Promise<GlobalLeaderboardEntry[]> {
    return this.leaderboardRepository.getGlobalTop(limit);
  }
}
