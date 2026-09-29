import type { RegisteredUser, User } from "@/core/domain/entities/user";

// Wire format of a user as the backend returns it (register, GET /users/:id).
export type UserDto = {
  id: string;
  username: string;
  role: string;
};

// Wire format for POST {base}/register. Players have no password: the
// username alone creates the account and the response carries its token.
export type RegisterUserRequestDto = {
  username: string;
};

export type RegisterUserResponseDto = {
  success: boolean;
  message: string;
  data: {
    user: UserDto;
    token: string;
  };
};

// Wire format for GET {base}/users/:id.
export type GetUserResponseDto = {
  success: boolean;
  message: string;
  data: UserDto;
};

export function userFromDto(dto: UserDto): User {
  return { id: dto.id, name: dto.username };
}

export function registeredUserFromDto(dto: RegisterUserResponseDto): RegisteredUser {
  return { ...userFromDto(dto.data.user), token: dto.data.token };
}
