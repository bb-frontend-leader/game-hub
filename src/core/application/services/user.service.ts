import { CreateUserUseCase } from "@/core/application/use-cases/create-user.use-case";
import { GetUserUseCase } from "@/core/application/use-cases/get-user.use-case";
import type { RegisteredUser, User } from "@/core/domain/entities/user";
import type { CreateUserInput, UserRepository } from "@/core/domain/repositories/user.repository";

export class UserService {
  private readonly createUserUseCase: CreateUserUseCase;
  private readonly getUserUseCase: GetUserUseCase;

  constructor(userRepository: UserRepository) {
    this.createUserUseCase = new CreateUserUseCase(userRepository);
    this.getUserUseCase = new GetUserUseCase(userRepository);
  }

  async createUser(input: CreateUserInput): Promise<RegisteredUser> {
    return this.createUserUseCase.execute(input);
  }

  async getUser(token: string, id: string): Promise<User> {
    return this.getUserUseCase.execute(token, id);
  }
}
