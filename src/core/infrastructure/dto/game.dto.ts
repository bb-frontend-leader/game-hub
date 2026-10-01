import type { GameId } from "@/core/domain/entities/game";

// The backend names the games "game1" / "game2" (in the order they're listed
// on the home page). Single source of truth for that mapping.
export type ApiGameDto = "game1" | "game2";

export const API_GAME: Record<GameId, ApiGameDto> = {
  "temple-of-knowledge": "game1",
  "whack-a-question": "game2",
};
