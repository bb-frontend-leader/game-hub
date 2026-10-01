import type { User } from "@/core/domain/entities/user";
import type {
  ScoreRepository,
  SubmitScoreInput,
} from "@/core/domain/repositories/score.repository";
import { fetchApiDataSource } from "@/core/infrastructure/datasources/fetch-api.datasource";
import { API_GAME } from "@/core/infrastructure/dto/game.dto";
import type {
  SubmitScoreRequestDto,
  SubmitScoreResponseDto,
} from "@/core/infrastructure/dto/score.dto";
import { userFromDto } from "@/core/infrastructure/dto/user.dto";

// PUT {base}/scores. Responds 409 if the player already has a score for that
// game, and 403 if `userId` isn't the token's owner.
const SCORES_PATH = "/scores";

export class HttpScoreRepository implements ScoreRepository {
  async submit(token: string, input: SubmitScoreInput): Promise<User> {
    const body: SubmitScoreRequestDto = {
      userId: input.userId,
      game: API_GAME[input.gameId],
      score: input.points,
    };
    const dto = await fetchApiDataSource.put<SubmitScoreResponseDto>(SCORES_PATH, body, {
      token,
    });
    return userFromDto(dto.data);
  }
}
