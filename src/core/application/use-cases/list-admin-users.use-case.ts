import type { AdminUserSummary } from "@/core/domain/entities/admin-user";
import type { AdminRepository } from "@/core/domain/repositories/admin.repository";

// Lists every registered user for the admin roster view.
export class ListAdminUsersUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(token: string): Promise<AdminUserSummary[]> {
    return this.adminRepository.listUsers(token);
  }
}
