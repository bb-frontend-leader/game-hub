import { LoginAdminUseCase } from "@/core/application/use-cases/login-admin.use-case";
import { LogoutAdminUseCase } from "@/core/application/use-cases/logout-admin.use-case";
import type { AdminSession } from "@/core/domain/entities/admin-session";
import type {
  AdminAuthRepository,
  AdminLoginInput,
} from "@/core/domain/repositories/admin-auth.repository";

export class AdminAuthService {
  private readonly loginAdminUseCase: LoginAdminUseCase;
  private readonly logoutAdminUseCase: LogoutAdminUseCase;

  constructor(adminAuthRepository: AdminAuthRepository) {
    this.loginAdminUseCase = new LoginAdminUseCase(adminAuthRepository);
    this.logoutAdminUseCase = new LogoutAdminUseCase(adminAuthRepository);
  }

  async login(input: AdminLoginInput): Promise<AdminSession> {
    return this.loginAdminUseCase.execute(input);
  }

  async logout(token: string): Promise<void> {
    return this.logoutAdminUseCase.execute(token);
  }
}
