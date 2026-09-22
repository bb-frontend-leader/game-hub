// Sesión del admin guardada en el navegador tras un login exitoso (ver
// AdminAuthService). Distinta de src/lib/perfil.ts (esa es la del jugador):
// clave de storage y evento de logout separados para que nunca se pisen.

import type { AdminSession } from "@/core";

export type { AdminSession };

const STORAGE_KEY = "juegolandia-admin-session";

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AdminSession;
    if (typeof parsed?.token !== "string" || !parsed.token) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveAdminSession(session: AdminSession): AdminSession {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function clearAdminSession() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("juegolandia:admin-logout"));
}
