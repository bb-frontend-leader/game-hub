import type { User } from "@/core/domain/entities/user";

export type CreateUserInput = {
  name: string;
  emoji: string;
};

// Port for persisting the user created at "login" (picking a display name).
export interface UserRepository {
  create(input: CreateUserInput): Promise<User>;
  getById(id: string): Promise<User>;
}
