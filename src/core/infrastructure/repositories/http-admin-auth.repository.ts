import type { AdminSession } from "@/core/domain/entities/admin-session";
import type {
  AdminAuthRepository,
  AdminLoginInput,
} from "@/core/domain/repositories/admin-auth.repository";
import {
  ApiError,
  fetchApiDataSource,
} from "@/core/infrastructure/datasources/fetch-api.datasource";
import {
  ADMIN_ROLE,
  type AdminLoginRequestDto,
  adminSessionFromDto,
  type LoginResponseDto,
} from "@/core/infrastructure/dto/admin-auth.dto";

const ADMIN_LOGIN_PATH = "/login";
// Invalidates the bearer token (401 if it was already invalid/expired).
const LOGOUT_PATH = "/logout";

export class HttpAdminAuthRepository implements AdminAuthRepository {
  async login(input: AdminLoginInput): Promise<AdminSession> {
    const body: AdminLoginRequestDto = { username: input.username, password: input.password };
    const dto = await fetchApiDataSource.post<LoginResponseDto>(ADMIN_LOGIN_PATH, body);
    // The login endpoint is shared with players, so a valid non-admin account
    // still gets a 200 — reject it here instead of opening the admin panel.
    if (dto.data.user.role !== ADMIN_ROLE) {
      throw new ApiError("Authenticated user is not an admin", { status: 403, body: dto });
    }
    return adminSessionFromDto(dto);
  }

  async logout(token: string): Promise<void> {
    await fetchApiDataSource.post(LOGOUT_PATH, undefined, { token });
  }
}
