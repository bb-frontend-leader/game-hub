import type { RegisteredUser, User } from "@/core/domain/entities/user";
import type { CreateUserInput, UserRepository } from "@/core/domain/repositories/user.repository";
import { fetchApiDataSource } from "@/core/infrastructure/datasources/fetch-api.datasource";
import {
  type GetUserResponseDto,
  registeredUserFromDto,
  type RegisterUserRequestDto,
  type RegisterUserResponseDto,
  userFromDto,
} from "@/core/infrastructure/dto/user.dto";

// Responds 409 when the username is already taken.
const REGISTER_PATH = "/register";
// Responds 404 when the user doesn't exist (e.g. an admin deleted it).
const USERS_PATH = "/users";

export class HttpUserRepository implements UserRepository {
  async create(input: CreateUserInput): Promise<RegisteredUser> {
    const body: RegisterUserRequestDto = { username: input.name };
    const dto = await fetchApiDataSource.post<RegisterUserResponseDto>(REGISTER_PATH, body);
    return registeredUserFromDto(dto);
  }

  async getById(token: string, id: string): Promise<User> {
    const dto = await fetchApiDataSource.get<GetUserResponseDto>(
      `${USERS_PATH}/${encodeURIComponent(id)}`,
      undefined,
      { token },
    );
    return userFromDto(dto.data);
  }
}
