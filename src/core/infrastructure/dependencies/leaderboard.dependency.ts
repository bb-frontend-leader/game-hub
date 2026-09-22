import { LeaderboardService } from "@/core/application/services/leaderboard.service";
import { HttpLeaderboardRepository } from "@/core/infrastructure/repositories/http-leaderboard.repository";

export function getLeaderboardDependencies(): LeaderboardService {
  const leaderboardRepository = new HttpLeaderboardRepository();
  return new LeaderboardService(leaderboardRepository);
}

// Singleton instance of LeaderboardService
// This ensures that the LeaderboardService is initialized only once and reused throughout the application
let leaderboardServiceInstance: LeaderboardService | null = null;

export function getLeaderboardService(): LeaderboardService {
  if (!leaderboardServiceInstance) {
    leaderboardServiceInstance = getLeaderboardDependencies();
  }
  return leaderboardServiceInstance;
}
