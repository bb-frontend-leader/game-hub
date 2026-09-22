import { ScoreService } from "@/core/application/services/score.service";
import { HttpScoreRepository } from "@/core/infrastructure/repositories/http-score.repository";

export function getScoreDependencies(): ScoreService {
  const scoreRepository = new HttpScoreRepository();
  return new ScoreService(scoreRepository);
}

// Singleton instance of ScoreService
// This ensures that the ScoreService is initialized only once and reused throughout the application
let scoreServiceInstance: ScoreService | null = null;

export function getScoreService(): ScoreService {
  if (!scoreServiceInstance) {
    scoreServiceInstance = getScoreDependencies();
  }
  return scoreServiceInstance;
}
