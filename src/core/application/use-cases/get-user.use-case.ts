import type { User } from "@/core/domain/entities/user";
import type { UserRepository } from "@/core/domain/repositories/user.repository";

// Refreshes a previously created user's info (name/emoji) from the backend.
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }
}
