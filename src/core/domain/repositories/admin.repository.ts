import type { AdminUserSummary } from "@/core/domain/entities/admin-user";

// Port for admin-only user management: the full roster and moderation
// actions on it. Every method requires the bearer token from a prior
// AdminAuthRepository.login().
export interface AdminRepository {
  listUsers(token: string): Promise<AdminUserSummary[]>;
  deleteUser(token: string, userId: string): Promise<void>;
  // Zeroes the user's total points across every game.
  resetUserScore(token: string, userId: string): Promise<void>;
}
