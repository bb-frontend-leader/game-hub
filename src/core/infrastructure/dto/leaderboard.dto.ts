import type { GameId } from "@/core/domain/entities/game";
import type {
  GlobalLeaderboardEntry,
  LeaderboardEntry,
} from "@/core/domain/entities/leaderboard-entry";

// PLACEHOLDER_API_CONTRACT — wire format for GET {base}/leaderboard.
export type LeaderboardEntryDto = {
  userId: string;
  name: string;
  emoji: string;
  gameId: GameId;
  points: number;
  rank: number;
};

export function leaderboardEntryFromDto(dto: LeaderboardEntryDto): LeaderboardEntry {
  return {
    userId: dto.userId,
    name: dto.name,
    emoji: dto.emoji,
    gameId: dto.gameId,
    points: dto.points,
    rank: dto.rank,
  };
}

// PLACEHOLDER_API_CONTRACT — wire format for GET {base}/leaderboard/global.
export type GlobalLeaderboardEntryDto = {
  userId: string;
  name: string;
  emoji: string;
  points: number;
  rank: number;
};

export function globalLeaderboardEntryFromDto(
  dto: GlobalLeaderboardEntryDto,
): GlobalLeaderboardEntry {
  return {
    userId: dto.userId,
    name: dto.name,
    emoji: dto.emoji,
    points: dto.points,
    rank: dto.rank,
  };
}
