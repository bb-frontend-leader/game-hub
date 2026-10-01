import type { GameId } from "@/core/domain/entities/game";
import type {
  GlobalLeaderboardEntry,
  LeaderboardEntry,
} from "@/core/domain/entities/leaderboard-entry";
import { API_GAME } from "@/core/infrastructure/dto/game.dto";

// Wire format for GET {base}/ranking: every user with their per-game and
// total scores. There's no per-game endpoint, so ranks are computed here.
export type RankingUserDto = {
  id: string;
  username: string;
  role: string;
  game1Score: number;
  game2Score: number;
  totalScore: number;
};

export type RankingResponseDto = {
  success: boolean;
  message: string;
  data: RankingUserDto[];
};

const ADMIN_ROLE = "ADMIN";

// Players only, sorted by the given score (highest first) and cut to `limit`.
function topPlayers(
  dtos: RankingUserDto[],
  field: "game1Score" | "game2Score" | "totalScore",
  limit: number | undefined,
): RankingUserDto[] {
  const sorted = dtos.filter((dto) => dto.role !== ADMIN_ROLE).sort((a, b) => b[field] - a[field]);
  return limit === undefined ? sorted : sorted.slice(0, limit);
}

export function leaderboardFromDto(
  dto: RankingResponseDto,
  gameId: GameId,
  limit?: number,
): LeaderboardEntry[] {
  const field = `${API_GAME[gameId]}Score` as const;
  return topPlayers(dto.data, field, limit).map((user, index) => ({
    userId: user.id,
    name: user.username,
    gameId,
    points: user[field],
    rank: index + 1,
  }));
}

export function globalLeaderboardFromDto(
  dto: RankingResponseDto,
  limit?: number,
): GlobalLeaderboardEntry[] {
  return topPlayers(dto.data, "totalScore", limit).map((user, index) => ({
    userId: user.id,
    name: user.username,
    points: user.totalScore,
    rank: index + 1,
  }));
}
