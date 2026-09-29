import type { RegisteredUser, User } from "@/core/domain/entities/user";
import type {
  CreateUserInput,
  LoginUserInput,
  UserRepository,
} from "@/core/domain/repositories/user.repository";
import {
  ApiError,
  fetchApiDataSource,
} from "@/core/infrastructure/datasources/fetch-api.datasource";
import {
  type GetUserResponseDto,
  type LoginUserRequestDto,
  PLAYER_ROLE,
  type PlayerAuthResponseDto,
  registeredUserFromDto,
  type RegisterUserRequestDto,
  userFromDto,
} from "@/core/infrastructure/dto/user.dto";

// Responds 409 when the username is already taken.
const REGISTER_PATH = "/register";
// Shared with admins. Responds 401 on a wrong name/code.
const LOGIN_PATH = "/login";
// Responds 404 when the user doesn't exist (e.g. an admin deleted it).
const USERS_PATH = "/users";

export class HttpUserRepository implements UserRepository {
  async create(input: CreateUserInput): Promise<RegisteredUser> {
    const body: RegisterUserRequestDto = { username: input.name };
    const dto = await fetchApiDataSource.post<PlayerAuthResponseDto>(REGISTER_PATH, body);
    return registeredUserFromDto(dto);
  }

  async login(input: LoginUserInput): Promise<RegisteredUser> {
    const body: LoginUserRequestDto = { username: input.name, password: input.code };
    const dto = await fetchApiDataSource.post<PlayerAuthResponseDto>(LOGIN_PATH, body);
    // The endpoint also logs admins in; they must use the admin panel instead.
    if (dto.data.user.role !== PLAYER_ROLE) {
      throw new ApiError("Authenticated user is not a player", { status: 403, body: dto });
    }
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
