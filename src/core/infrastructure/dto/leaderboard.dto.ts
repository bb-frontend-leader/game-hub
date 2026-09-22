import type { GameId } from "@/core/domain/entities/game";
import type { LeaderboardEntry } from "@/core/domain/entities/leaderboard-entry";

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
