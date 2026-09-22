import { LoginAdminUseCase } from "@/core/application/use-cases/login-admin.use-case";
import type { AdminSession } from "@/core/domain/entities/admin-session";
import type {
  AdminAuthRepository,
  AdminLoginInput,
} from "@/core/domain/repositories/admin-auth.repository";

export class AdminAuthService {
  private readonly loginAdminUseCase: LoginAdminUseCase;

  constructor(adminAuthRepository: AdminAuthRepository) {
    this.loginAdminUseCase = new LoginAdminUseCase(adminAuthRepository);
  }

  async login(input: AdminLoginInput): Promise<AdminSession> {
    return this.loginAdminUseCase.execute(input);
  }
}
