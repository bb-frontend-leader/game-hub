import type { User } from "@/core/domain/entities/user";
import type { CreateUserInput, UserRepository } from "@/core/domain/repositories/user.repository";

export type { CreateUserInput };

// Saves the user created at "login" (there is no real auth — this just
// persists the chosen display name + emoji and gets back a durable id).
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    return this.userRepository.create(input);
  }
}
