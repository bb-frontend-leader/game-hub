import { AdminAuthService } from "@/core/application/services/admin-auth.service";
import { HttpAdminAuthRepository } from "@/core/infrastructure/repositories/http-admin-auth.repository";

export function getAdminAuthDependencies(): AdminAuthService {
  const adminAuthRepository = new HttpAdminAuthRepository();
  return new AdminAuthService(adminAuthRepository);
}

// Singleton instance of AdminAuthService
// This ensures that the AdminAuthService is initialized only once and reused throughout the application
let adminAuthServiceInstance: AdminAuthService | null = null;

export function getAdminAuthService(): AdminAuthService {
  if (!adminAuthServiceInstance) {
    adminAuthServiceInstance = getAdminAuthDependencies();
  }
  return adminAuthServiceInstance;
}
