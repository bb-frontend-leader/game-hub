import type { AdminSession } from "@/core/domain/entities/admin-session";

// PLACEHOLDER_API_CONTRACT — wire format for POST {base}/admin/login.
export type AdminLoginRequestDto = {
  username: string;
  password: string;
};

export type AdminSessionDto = {
  token: string;
  username: string;
};

export function adminSessionFromDto(dto: AdminSessionDto): AdminSession {
  return { token: dto.token, username: dto.username };
}
