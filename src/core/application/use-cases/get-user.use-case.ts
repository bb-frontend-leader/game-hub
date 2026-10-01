import type { User } from "@/core/domain/entities/user";
import type { UserRepository } from "@/core/domain/repositories/user.repository";

// Refreshes a previously created user's info from the backend.
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(token: string, id: string): Promise<User> {
    return this.userRepository.getById(token, id);
  }
}
