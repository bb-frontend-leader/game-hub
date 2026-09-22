import type { User } from "@/core/domain/entities/user";
import type { CreateUserInput, UserRepository } from "@/core/domain/repositories/user.repository";
import { fetchApiDataSource } from "@/core/infrastructure/datasources/fetch-api.datasource";
import {
  type CreateUserRequestDto,
  type UserDto,
  userFromDto,
} from "@/core/infrastructure/dto/user.dto";

// PLACEHOLDER_API_CONTRACT: POST {base}/users. Assumes the backend returns the
// created user, including its persistent id, in the response body.
const USERS_PATH = "/users";

export class HttpUserRepository implements UserRepository {
  async create(input: CreateUserInput): Promise<User> {
    const body: CreateUserRequestDto = { name: input.name, emoji: input.emoji };
    const dto = await fetchApiDataSource.post<UserDto>(USERS_PATH, body);
    return userFromDto(dto);
  }
}
