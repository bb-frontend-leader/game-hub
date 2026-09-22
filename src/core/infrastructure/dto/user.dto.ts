import type { User } from "@/core/domain/entities/user";

// PLACEHOLDER_API_CONTRACT — wire format for POST {base}/users. Field names
// and casing are guesses until the backend team shares the real contract;
// this file is the only place that should need to change once they do.
export type CreateUserRequestDto = {
  name: string;
  emoji: string;
};

export type UserDto = {
  id: string;
  name: string;
  emoji: string;
};

export function userFromDto(dto: UserDto): User {
  return { id: dto.id, name: dto.name, emoji: dto.emoji };
}
