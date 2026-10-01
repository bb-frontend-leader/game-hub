import type { GameId } from "@/core/domain/entities/game";

// A single score submission for one game activity.
export type Score = {
  userId: string;
  gameId: GameId;
  points: number;
};

// A game's score is a whole number between these bounds (inclusive).
export const MIN_SCORE_POINTS = 0;
export const MAX_SCORE_POINTS = 100;

// Turns whatever a game computed into a valid score: rounded to an integer
// and clamped to [MIN_SCORE_POINTS, MAX_SCORE_POINTS]. A non-finite value
// (NaN, Infinity) means the game's calculation is broken, so it throws rather
// than silently recording a made-up number.
export function normalizeScorePoints(points: number): number {
  if (!Number.isFinite(points)) {
    throw new RangeError(`Invalid score points: ${points}`);
  }
  return Math.min(MAX_SCORE_POINTS, Math.max(MIN_SCORE_POINTS, Math.round(points)));
}
