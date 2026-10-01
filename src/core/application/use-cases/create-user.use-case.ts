import { isValidUsername, type RegisteredUser } from "@/core/domain/entities/user";
import type { CreateUserInput, UserRepository } from "@/core/domain/repositories/user.repository";

export type { CreateUserInput };

// Registers a new player with the chosen display name and gets back a
// durable id, token and access code. The name must already follow the
// username rule (see sanitizeUsername); an invalid one never reaches the API.
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<RegisteredUser> {
    if (!isValidUsername(input.name)) {
      throw new RangeError(`Invalid username: "${input.name}"`);
    }
    return this.userRepository.create(input);
  }
}
