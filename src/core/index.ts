// Composition root for the CORE module: re-exports the per-service dependency
// injection getters (see `infrastructure/dependencies`) and the domain types
// for convenient importing elsewhere. Wiring this into the UI (the login
// flow, the post-game score submission, the leaderboard modal) is a separate,
// later step — not part of this change.
export type { AdminSession } from "@/core/domain/entities/admin-session";
export type { AdminUserSummary } from "@/core/domain/entities/admin-user";
export type { GameId } from "@/core/domain/entities/game";
export type {
  GlobalLeaderboardEntry,
  LeaderboardEntry,
} from "@/core/domain/entities/leaderboard-entry";
export type { Score } from "@/core/domain/entities/score";
export type { User } from "@/core/domain/entities/user";
export type { AdminLoginInput } from "@/core/domain/repositories/admin-auth.repository";
export type { SubmitScoreInput } from "@/core/domain/repositories/score.repository";
export type { CreateUserInput } from "@/core/domain/repositories/user.repository";
export { ApiError } from "@/core/infrastructure/datasources/fetch-api.datasource";
export { getAdminService } from "@/core/infrastructure/dependencies/admin.dependency";
export { getAdminAuthService } from "@/core/infrastructure/dependencies/admin-auth.dependency";
export { getLeaderboardService } from "@/core/infrastructure/dependencies/leaderboard.dependency";
export { getScoreService } from "@/core/infrastructure/dependencies/score.dependency";
export { getUserService } from "@/core/infrastructure/dependencies/user.dependency";
