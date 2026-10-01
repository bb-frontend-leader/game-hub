import type { RegisteredUser } from "@/core/domain/entities/user";
import type { LoginUserInput, UserRepository } from "@/core/domain/repositories/user.repository";

export type { LoginUserInput };

// Lets an already-registered player back in with their name + access code.
// The code is shown in uppercase and the backend compares it case-sensitively,
// so it's normalized here to forgive how it was typed.
export class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: LoginUserInput): Promise<RegisteredUser> {
    return this.userRepository.login({
      name: input.name.trim(),
      code: input.code.trim().toUpperCase(),
    });
  }
}
