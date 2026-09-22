import { CreateUserUseCase } from "@/core/application/use-cases/create-user.use-case";
import type { User } from "@/core/domain/entities/user";
import type { CreateUserInput, UserRepository } from "@/core/domain/repositories/user.repository";

export class UserService {
  private readonly createUserUseCase: CreateUserUseCase;

  constructor(userRepository: UserRepository) {
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  async createUser(input: CreateUserInput): Promise<User> {
    return this.createUserUseCase.execute(input);
  }
}
