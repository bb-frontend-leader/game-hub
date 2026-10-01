import { normalizeScorePoints } from "@/core/domain/entities/score";
import type { User } from "@/core/domain/entities/user";
import type {
  ScoreRepository,
  SubmitScoreInput,
} from "@/core/domain/repositories/score.repository";

export type { SubmitScoreInput };

// Submits the score obtained from a game activity, scoped to that game's id.
// The points are normalized first (integer in 0–100): the backend doesn't
// enforce the upper bound, so the client must.
export class SubmitScoreUseCase {
  constructor(private readonly scoreRepository: ScoreRepository) {}

  async execute(token: string, input: SubmitScoreInput): Promise<User> {
    return this.scoreRepository.submit(token, {
      ...input,
      points: normalizeScorePoints(input.points),
    });
  }
}
