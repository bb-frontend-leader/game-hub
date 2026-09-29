import { CreateUserUseCase } from "@/core/application/use-cases/create-user.use-case";
import { GetUserUseCase } from "@/core/application/use-cases/get-user.use-case";
import { LoginUserUseCase } from "@/core/application/use-cases/login-user.use-case";
import { LogoutUserUseCase } from "@/core/application/use-cases/logout-user.use-case";
import type { RegisteredUser, User } from "@/core/domain/entities/user";
import type {
  CreateUserInput,
  LoginUserInput,
  UserRepository,
} from "@/core/domain/repositories/user.repository";

export class UserService {
  private readonly createUserUseCase: CreateUserUseCase;
  private readonly loginUserUseCase: LoginUserUseCase;
  private readonly logoutUserUseCase: LogoutUserUseCase;
  private readonly getUserUseCase: GetUserUseCase;

  constructor(userRepository: UserRepository) {
    this.createUserUseCase = new CreateUserUseCase(userRepository);
    this.loginUserUseCase = new LoginUserUseCase(userRepository);
    this.logoutUserUseCase = new LogoutUserUseCase(userRepository);
    this.getUserUseCase = new GetUserUseCase(userRepository);
  }

  async createUser(input: CreateUserInput): Promise<RegisteredUser> {
    return this.createUserUseCase.execute(input);
  }

  async loginUser(input: LoginUserInput): Promise<RegisteredUser> {
    return this.loginUserUseCase.execute(input);
  }

  async logoutUser(token: string): Promise<void> {
    return this.logoutUserUseCase.execute(token);
  }

  async getUser(token: string, id: string): Promise<User> {
    return this.getUserUseCase.execute(token, id);
  }
}
