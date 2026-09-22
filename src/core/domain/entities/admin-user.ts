// One row of the full admin user roster: every registered user, including
// ones with no score yet — unlike LeaderboardEntry, which only lists ranked
// (i.e. already-scoring) players.
export type AdminUserSummary = {
  id: string;
  name: string;
  emoji: string;
  totalPoints: number;
};
