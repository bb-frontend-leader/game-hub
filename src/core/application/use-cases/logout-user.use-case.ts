import type { UserRepository } from "@/core/domain/repositories/user.repository";

// Ends the player's session on the backend (its token stops working; the
// player needs their name + access code to get back in).
export class LogoutUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(token: string): Promise<void> {
    return this.userRepository.logout(token);
  }
}
