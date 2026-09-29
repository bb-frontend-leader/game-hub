import type { RegisteredUser, User } from "@/core/domain/entities/user";

export type CreateUserInput = {
  name: string;
};

// Port for persisting the user created at "login" (picking a display name).
export interface UserRepository {
  create(input: CreateUserInput): Promise<RegisteredUser>;
  // `token` is the bearer token of whoever is asking.
  getById(token: string, id: string): Promise<User>;
}
