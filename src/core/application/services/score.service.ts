import { SubmitScoreUseCase } from "@/core/application/use-cases/submit-score.use-case";
import type {
  ScoreRepository,
  SubmitScoreInput,
} from "@/core/domain/repositories/score.repository";

export class ScoreService {
  private readonly submitScoreUseCase: SubmitScoreUseCase;

  constructor(scoreRepository: ScoreRepository) {
    this.submitScoreUseCase = new SubmitScoreUseCase(scoreRepository);
  }

  async submitScore(input: SubmitScoreInput): Promise<void> {
    return this.submitScoreUseCase.execute(input);
  }
}
