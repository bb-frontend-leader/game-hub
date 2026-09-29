import { ListAdminUsersUseCase } from "@/core/application/use-cases/list-admin-users.use-case";
import { ResetAdminUserScoreUseCase } from "@/core/application/use-cases/reset-admin-user-score.use-case";
import type { AdminUserSummary } from "@/core/domain/entities/admin-user";
import type { AdminRepository } from "@/core/domain/repositories/admin.repository";

export class AdminService {
  private readonly listAdminUsersUseCase: ListAdminUsersUseCase;
  private readonly resetAdminUserScoreUseCase: ResetAdminUserScoreUseCase;

  constructor(adminRepository: AdminRepository) {
    this.listAdminUsersUseCase = new ListAdminUsersUseCase(adminRepository);
    this.resetAdminUserScoreUseCase = new ResetAdminUserScoreUseCase(adminRepository);
  }

  async listUsers(token: string): Promise<AdminUserSummary[]> {
    return this.listAdminUsersUseCase.execute(token);
  }

  async resetUserScore(token: string, userId: string): Promise<void> {
    return this.resetAdminUserScoreUseCase.execute(token, userId);
  }
}
