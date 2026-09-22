import type {
  ScoreRepository,
  SubmitScoreInput,
} from "@/core/domain/repositories/score.repository";
import { fetchApiDataSource } from "@/core/infrastructure/datasources/fetch-api.datasource";
import type { SubmitScoreRequestDto } from "@/core/infrastructure/dto/score.dto";

// PLACEHOLDER_API_CONTRACT: POST {base}/scores.
const SCORES_PATH = "/scores";

export class HttpScoreRepository implements ScoreRepository {
  async submit(input: SubmitScoreInput): Promise<void> {
    const body: SubmitScoreRequestDto = {
      userId: input.userId,
      gameId: input.gameId,
      points: input.points,
    };
    await fetchApiDataSource.post(SCORES_PATH, body);
  }
}
