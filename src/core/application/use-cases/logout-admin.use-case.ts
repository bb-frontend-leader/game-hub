import type { AdminAuthRepository } from "@/core/domain/repositories/admin-auth.repository";

// Ends the admin's session on the backend (its token stops working).
export class LogoutAdminUseCase {
  constructor(private readonly adminAuthRepository: AdminAuthRepository) {}

  async execute(token: string): Promise<void> {
    return this.adminAuthRepository.logout(token);
  }
}
