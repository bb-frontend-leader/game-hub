import type { AdminSession } from "@/core/domain/entities/admin-session";
import type {
  AdminAuthRepository,
  AdminLoginInput,
} from "@/core/domain/repositories/admin-auth.repository";

export type { AdminLoginInput };

// Authenticates an admin (teacher) with a username/password.
export class LoginAdminUseCase {
  constructor(private readonly adminAuthRepository: AdminAuthRepository) {}

  async execute(input: AdminLoginInput): Promise<AdminSession> {
    return this.adminAuthRepository.login(input);
  }
}
