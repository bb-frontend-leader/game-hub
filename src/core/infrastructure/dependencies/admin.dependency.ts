import { AdminService } from "@/core/application/services/admin.service";
import { HttpAdminRepository } from "@/core/infrastructure/repositories/http-admin.repository";

export function getAdminDependencies(): AdminService {
  const adminRepository = new HttpAdminRepository();
  return new AdminService(adminRepository);
}

// Singleton instance of AdminService
// This ensures that the AdminService is initialized only once and reused throughout the application
let adminServiceInstance: AdminService | null = null;

export function getAdminService(): AdminService {
  if (!adminServiceInstance) {
    adminServiceInstance = getAdminDependencies();
  }
  return adminServiceInstance;
}
