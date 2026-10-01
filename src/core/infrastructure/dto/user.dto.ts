import type { GameId } from "@/core/domain/entities/game";
import type { RegisteredUser, User } from "@/core/domain/entities/user";
import { API_GAME } from "@/core/infrastructure/dto/game.dto";

// Wire format of a user as the backend returns it (register, login,
// GET /users/:id). `code` is the player's access code (null for admins).
// The score fields may be absent on register/login (a brand-new user hasn't
// played anything yet); `userFromDto` only reads them for games marked
// played, so a missing field there never surfaces as a fake score.
export type UserDto = {
  id: string;
  username: string;
  role: string;
  code: string | null;
  game1Played: boolean;
  game2Played: boolean;
  game1Score?: number;
  game2Score?: number;
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
  const gameIds = Object.keys(API_GAME) as GameId[];
  const playedGames = gameIds.filter((gameId) => dto[`${API_GAME[gameId]}Played`]);
  const scores = Object.fromEntries(
    playedGames.map((gameId) => [gameId, dto[`${API_GAME[gameId]}Score`] ?? 0]),
  ) as Partial<Record<GameId, number>>;
  return { id: dto.id, name: dto.username, playedGames, scores };
}

export function registeredUserFromDto(dto: PlayerAuthResponseDto): RegisteredUser {
  const { user, token } = dto.data;
  return { ...userFromDto(user), token, ...(user.code ? { code: user.code } : {}) };
}
