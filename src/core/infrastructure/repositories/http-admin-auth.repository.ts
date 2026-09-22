import type { AdminSession } from "@/core/domain/entities/admin-session";
import type {
  AdminAuthRepository,
  AdminLoginInput,
} from "@/core/domain/repositories/admin-auth.repository";
import { fetchApiDataSource } from "@/core/infrastructure/datasources/fetch-api.datasource";
import {
  type AdminLoginRequestDto,
  type AdminSessionDto,
  adminSessionFromDto,
} from "@/core/infrastructure/dto/admin-auth.dto";

// PLACEHOLDER_API_CONTRACT: POST {base}/admin/login.
const ADMIN_LOGIN_PATH = "/admin/login";

export class HttpAdminAuthRepository implements AdminAuthRepository {
  async login(input: AdminLoginInput): Promise<AdminSession> {
    const body: AdminLoginRequestDto = { username: input.username, password: input.password };
    const dto = await fetchApiDataSource.post<AdminSessionDto>(ADMIN_LOGIN_PATH, body);
    return adminSessionFromDto(dto);
  }
}
