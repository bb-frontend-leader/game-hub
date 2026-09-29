import type { AnyRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import { SessionExpiredError } from "@/core";
import { clearAdminSession, getAdminSession } from "@/lib/admin-session";
import { expirePerfil, getPerfil } from "@/lib/perfil";

// Manejador global (ver QueryCache/MutationCache en src/router.tsx): cuando
// cualquier consulta o mutación falla porque el token venció, cierra la
// sesión que corresponda según la zona de la app en la que se está.
// Si varias peticiones fallan a la vez, solo la primera actúa: las demás ya
// no encuentran sesión que cerrar.
export function handleSessionExpired(error: unknown, router: AnyRouter) {
  if (!(error instanceof SessionExpiredError)) return;

  const isAdminArea = router.state.location.pathname.startsWith("/admin");

  if (isAdminArea) {
    if (!getAdminSession()) return;
    clearAdminSession();
    toast.error("Tu sesión de administrador expiró. Vuelve a ingresar.");
    void router.navigate({ to: "/admin/login" });
    return;
  }

  const perfil = getPerfil();
  if (!perfil?.token) return;
  expirePerfil(perfil.name);
  toast.info("Tu sesión terminó. Entra otra vez con tu nombre y tu código.", {
    duration: 8000,
  });
}
