import type { ApiGameDto } from "@/core/infrastructure/dto/game.dto";
import type { UserDto } from "@/core/infrastructure/dto/user.dto";

// Wire format for POST {base}/scores. `score` must be an integer; the backend
// checks `>= 0` but not the upper bound (see normalizeScorePoints).
export type SubmitScoreRequestDto = {
  userId: string;
  game: ApiGameDto;
  score: number;
};

// The response carries the player with its updated scores.
export type SubmitScoreResponseDto = {
  success: boolean;
  message: string;
  data: UserDto;
};
