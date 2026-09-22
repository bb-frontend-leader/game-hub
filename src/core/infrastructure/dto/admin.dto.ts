import type { AdminUserSummary } from "@/core/domain/entities/admin-user";

// PLACEHOLDER_API_CONTRACT — wire format for GET {base}/admin/users.
export type AdminUserSummaryDto = {
  id: string;
  name: string;
  emoji: string;
  totalPoints: number;
};

export function adminUserSummaryFromDto(dto: AdminUserSummaryDto): AdminUserSummary {
  return { id: dto.id, name: dto.name, emoji: dto.emoji, totalPoints: dto.totalPoints };
}
