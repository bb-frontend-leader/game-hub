import { UserService } from "@/core/application/services/user.service";
import { HttpUserRepository } from "@/core/infrastructure/repositories/http-user.repository";

export function getUserDependencies(): UserService {
  const userRepository = new HttpUserRepository();
  return new UserService(userRepository);
}

// Singleton instance of UserService
// This ensures that the UserService is initialized only once and reused throughout the application
let userServiceInstance: UserService | null = null;

export function getUserService(): UserService {
  if (!userServiceInstance) {
    userServiceInstance = getUserDependencies();
  }
  return userServiceInstance;
}
