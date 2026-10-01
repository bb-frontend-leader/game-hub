import type { GameId } from "@/core/domain/entities/game";

// A player as recorded by the backend: only the username is stored (the
// emoji is a client-side choice, see src/lib/perfil.ts). `id` is assigned by
// the backend the first time the register endpoint is called.
// `playedGames` lists the games the player already has a score for (each
// game can be scored only once). `scores` has an entry only for games in
// `playedGames` — an unplayed game is absent, not 0, so the UI can tell "no
// score yet" apart from "scored zero".
export type User = {
  id: string;
  name: string;
  playedGames: GameId[];
  scores: Partial<Record<GameId, number>>;
};

// Username rule enforced by the backend: 3–20 characters, only ASCII letters,
// digits and "_" (no accents, "ñ" or spaces).
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;
const USERNAME_PATTERN = /^[A-Za-z0-9_]+$/;

export function isValidUsername(name: string): boolean {
  return (
    name.length >= USERNAME_MIN_LENGTH &&
    name.length <= USERNAME_MAX_LENGTH &&
    USERNAME_PATTERN.test(name)
  );
}

// Best-effort fix of what a kid types into something the rule accepts:
// accents are stripped ("José" → "Jose", "ñ" → "n"), spaces and dashes
// become "_", any other disallowed character is dropped, and it's cut to the
// max length. Only leading spaces are trimmed: this runs on every keystroke,
// so trimming the end would eat the space before the next word.
// It doesn't pad short names — isValidUsername still has the final say.
export function sanitizeUsername(input: string): string {
  return input
    .trimStart()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[\s-]+/g, "_")
    .replace(/[^A-Za-z0-9_]/g, "")
    .slice(0, USERNAME_MAX_LENGTH);
}

// A player who just registered or logged in, plus the bearer token the
// backend issued, needed to authorize that player's later requests (e.g.
// submitting scores). `code` is the player's access code: together with the
// name, it's what lets them log back in.
export type RegisteredUser = User & {
  token: string;
  code?: string;
};
