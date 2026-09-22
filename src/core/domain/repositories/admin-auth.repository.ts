import type { AdminSession } from "@/core/domain/entities/admin-session";

export type AdminLoginInput = {
  username: string;
  password: string;
};

// Port for admin authentication.
export interface AdminAuthRepository {
  login(input: AdminLoginInput): Promise<AdminSession>;
}
