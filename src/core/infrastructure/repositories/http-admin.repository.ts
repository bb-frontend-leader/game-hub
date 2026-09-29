import type { AdminUserSummary } from "@/core/domain/entities/admin-user";
import type { AdminRepository } from "@/core/domain/repositories/admin.repository";
import { fetchApiDataSource } from "@/core/infrastructure/datasources/fetch-api.datasource";
import {
  ADMIN_ROLE,
  type AdminUsersPageDto,
  adminUserSummaryFromDto,
} from "@/core/infrastructure/dto/admin.dto";

// Admin-only user management under {base}/users (players get 403).
const ADMIN_USERS_PATH = "/users";
// Largest page the backend accepts.
const PAGE_SIZE = 100;

export class HttpAdminRepository implements AdminRepository {
  // Walks every page so the roster is complete, and leaves admins out of it
  // (they're not players, and an admin shouldn't be able to delete itself).
  async listUsers(token: string): Promise<AdminUserSummary[]> {
    const users: AdminUserSummary[] = [];
    for (let page = 1; ; page++) {
      const dto = await fetchApiDataSource.get<AdminUsersPageDto>(
        ADMIN_USERS_PATH,
        { page, limit: PAGE_SIZE },
        { token },
      );
      for (const row of dto.data.rows) {
        if (row.role !== ADMIN_ROLE) users.push(adminUserSummaryFromDto(row));
      }
      if (!dto.data.meta.hasNext) return users;
    }
  }

  // PLACEHOLDER_API_CONTRACT: DELETE {base}/admin/users/:id
  async deleteUser(token: string, userId: string): Promise<void> {
    await fetchApiDataSource.delete(`${ADMIN_USERS_PATH}/${userId}`, { token });
  }

  // PLACEHOLDER_API_CONTRACT: POST {base}/admin/users/:id/reset-score
  async resetUserScore(token: string, userId: string): Promise<void> {
    await fetchApiDataSource.post(`${ADMIN_USERS_PATH}/${userId}/reset-score`, undefined, {
      token,
    });
  }
}
