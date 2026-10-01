import type { RegisteredUser, User } from "@/core/domain/entities/user";

export type CreateUserInput = {
  name: string;
};

// A returning player: their name plus the access code shown at registration.
export type LoginUserInput = {
  name: string;
  code: string;
};

// Port for persisting the user created at "login" (picking a display name).
export interface UserRepository {
  create(input: CreateUserInput): Promise<RegisteredUser>;
  login(input: LoginUserInput): Promise<RegisteredUser>;
  // Invalidates the player's token on the backend.
  logout(token: string): Promise<void>;
  // `token` is the bearer token of whoever is asking.
  getById(token: string, id: string): Promise<User>;
}
