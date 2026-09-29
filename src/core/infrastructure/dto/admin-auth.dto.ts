import type { AdminSession } from "@/core/domain/entities/admin-session";

// Wire format for POST {base}/login (shared by players and admins; the
// returned `user.role` tells them apart).
export type AdminLoginRequestDto = {
  username: string;
  password: string;
};

export type LoginUserDto = {
  id: string;
  username: string;
  role: string;
};

export type LoginResponseDto = {
  success: boolean;
  message: string;
  data: {
    user: LoginUserDto;
    token: string;
  };
};

export const ADMIN_ROLE = "ADMIN";

export function adminSessionFromDto(dto: LoginResponseDto): AdminSession {
  return { token: dto.data.token, username: dto.data.user.username };
}
