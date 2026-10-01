// One row of the full admin user roster: every registered player, including
// ones with no score yet — unlike LeaderboardEntry, which only lists ranked
// (i.e. already-scoring) players. `code` is the player's access code, so the
// teacher can give it back to a kid who forgot it.
export type AdminUserSummary = {
  id: string;
  name: string;
  code: string | null;
  totalPoints: number;
};
