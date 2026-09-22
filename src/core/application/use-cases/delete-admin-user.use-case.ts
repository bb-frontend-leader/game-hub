import type { AdminRepository } from "@/core/domain/repositories/admin.repository";

// Permanently removes a registered user.
export class DeleteAdminUserUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(token: string, userId: string): Promise<void> {
    return this.adminRepository.deleteUser(token, userId);
  }
}
