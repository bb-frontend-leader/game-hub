// Medal emoji for the top 3 ranks, plain rank number otherwise. Shared by
// every leaderboard display (player header modal, admin big board).
export function medalFor(rank: number): string {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return String(rank);
}
