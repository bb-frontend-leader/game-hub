import type { AdminUserSummary } from "@/core/domain/entities/admin-user";
import type { AdminRepository } from "@/core/domain/repositories/admin.repository";
import { fetchApiDataSource } from "@/core/infrastructure/datasources/fetch-api.datasource";
import {
  type AdminUserSummaryDto,
  adminUserSummaryFromDto,
} from "@/core/infrastructure/dto/admin.dto";

// PLACEHOLDER_API_CONTRACT: admin-only user management, all under {base}/admin/users.
const ADMIN_USERS_PATH = "/admin/users";

export class HttpAdminRepository implements AdminRepository {
  // PLACEHOLDER_API_CONTRACT: GET {base}/admin/users
  async listUsers(token: string): Promise<AdminUserSummary[]> {
    const dtos = await fetchApiDataSource.get<AdminUserSummaryDto[]>(ADMIN_USERS_PATH, undefined, {
      token,
    });
    return dtos.map(adminUserSummaryFromDto);
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
