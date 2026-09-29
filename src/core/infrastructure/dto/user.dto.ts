import type { RegisteredUser, User } from "@/core/domain/entities/user";

// Wire format of a user as the backend returns it (register, login,
// GET /users/:id). `code` is the player's access code (null for admins).
export type UserDto = {
  id: string;
  username: string;
  role: string;
  code: string | null;
};

// Wire format for POST {base}/register: the username alone creates the
// account; the response carries its token and access code.
export type RegisterUserRequestDto = {
  username: string;
};

// Wire format for POST {base}/login when a player logs back in: the access
// code goes in the `password` field.
export type LoginUserRequestDto = {
  username: string;
  password: string;
};

// Response of both /register and /login.
export type PlayerAuthResponseDto = {
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

export const PLAYER_ROLE = "PLAYER";

export function userFromDto(dto: UserDto): User {
  return { id: dto.id, name: dto.username };
}

export function registeredUserFromDto(dto: PlayerAuthResponseDto): RegisteredUser {
  const { user, token } = dto.data;
  return { ...userFromDto(user), token, ...(user.code ? { code: user.code } : {}) };
}
