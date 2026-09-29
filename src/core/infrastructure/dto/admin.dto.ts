import type { AdminUserSummary } from "@/core/domain/entities/admin-user";

// Wire format for GET {base}/users?page=N&limit=M (admin only; `limit` <= 100).
// Only the fields the client uses are typed — the rows also carry the
// password hash, which must never be read or stored here.
export type AdminUserDto = {
  id: string;
  username: string;
  role: string;
  totalScore: number;
};

export type AdminUsersPageDto = {
  success: boolean;
  message: string;
  data: {
    rows: AdminUserDto[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
};

export const ADMIN_ROLE = "ADMIN";

export function adminUserSummaryFromDto(dto: AdminUserDto): AdminUserSummary {
  return { id: dto.id, name: dto.username, totalPoints: dto.totalScore };
}
