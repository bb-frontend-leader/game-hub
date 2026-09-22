import type {
  ScoreRepository,
  SubmitScoreInput,
} from "@/core/domain/repositories/score.repository";

export type { SubmitScoreInput };

// Submits the score obtained from a game activity, scoped to that game's id.
export class SubmitScoreUseCase {
  constructor(private readonly scoreRepository: ScoreRepository) {}

  async execute(input: SubmitScoreInput): Promise<void> {
    return this.scoreRepository.submit(input);
  }
}
