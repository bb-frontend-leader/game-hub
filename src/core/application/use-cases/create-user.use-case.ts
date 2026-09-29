import type { RegisteredUser } from "@/core/domain/entities/user";
import type { CreateUserInput, UserRepository } from "@/core/domain/repositories/user.repository";

export type { CreateUserInput };

// Registers the user created at "login" (there is no password — this just
// persists the chosen display name and gets back a durable id + token).
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<RegisteredUser> {
    return this.userRepository.create(input);
  }
}
