import type { AdminRepository } from "@/core/domain/repositories/admin.repository";

// Zeroes a user's total points across every game.
export class ResetAdminUserScoreUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(token: string, userId: string): Promise<void> {
    return this.adminRepository.resetUserScore(token, userId);
  }
}
