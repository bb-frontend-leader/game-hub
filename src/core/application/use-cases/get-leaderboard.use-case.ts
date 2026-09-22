import type { GameId } from "@/core/domain/entities/game";
import type { LeaderboardEntry } from "@/core/domain/entities/leaderboard-entry";
import type { LeaderboardRepository } from "@/core/domain/repositories/leaderboard.repository";

// Queries a single game's leaderboard/ranking table.
export class GetLeaderboardUseCase {
  constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

  async execute(gameId: GameId, limit?: number): Promise<LeaderboardEntry[]> {
    return this.leaderboardRepository.getTop(gameId, limit);
  }
}
