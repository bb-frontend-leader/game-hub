import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PixelIcon } from "@/components/pixel";
import { Button } from "@/components/ui/button";
import { getAdminAuthService } from "@/core";
import { clearAdminSession, getAdminSession } from "@/lib/admin-session";

export function AdminHeader({ username }: { username: string }) {
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Invalida el token en el backend y luego borra la sesión local. Si la
  // llamada falla (sin red, token ya vencido) se cierra la sesión igual.
  const logout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    const session = getAdminSession();
    if (session) {
      try {
        await getAdminAuthService().logout(session.token);
      } catch (error) {
        console.warn("No se pudo cerrar la sesión en el servidor", error);
      }
    }
    clearAdminSession();
    toast.success("Sesión de administrador cerrada");
    navigate({ to: "/admin/login" });
  };

  return (
    <header className="border-b-4 border-ink bg-night-900 shadow-[inset_0_-4px_0_0_var(--px-night-700)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/admin" className="flex items-center gap-3">
          <PixelIcon name="shield" scale={3} className="shrink-0 text-cyan" />
          <span className="px-title text-sm sm:text-xl">Panel de administración</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden max-w-[10rem] truncate text-lg text-muted-foreground md:inline">
            {username}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void logout()}
            disabled={isLoggingOut}
            aria-label="Cerrar sesión de administrador"
          >
            <PixelIcon name="exit" scale={2} />
            <span className="hidden min-[380px]:inline">Salir</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
