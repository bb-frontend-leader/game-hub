import { SubmitScoreUseCase } from "@/core/application/use-cases/submit-score.use-case";
import type { User } from "@/core/domain/entities/user";
import type {
  ScoreRepository,
  SubmitScoreInput,
} from "@/core/domain/repositories/score.repository";

export class ScoreService {
  private readonly submitScoreUseCase: SubmitScoreUseCase;

  constructor(scoreRepository: ScoreRepository) {
    this.submitScoreUseCase = new SubmitScoreUseCase(scoreRepository);
  }

  async submitScore(token: string, input: SubmitScoreInput): Promise<User> {
    return this.submitScoreUseCase.execute(token, input);
  }
}
