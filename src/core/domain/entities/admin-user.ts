// One row of the full admin user roster: every registered player, including
// ones with no score yet — unlike LeaderboardEntry, which only lists ranked
// (i.e. already-scoring) players.
export type AdminUserSummary = {
  id: string;
  name: string;
  totalPoints: number;
};
