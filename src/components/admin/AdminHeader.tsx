import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { PixelIcon } from "@/components/pixel";
import { Button } from "@/components/ui/button";
import { clearAdminSession } from "@/lib/admin-session";

export function AdminHeader({ username }: { username: string }) {
  const navigate = useNavigate();

  const logout = () => {
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
            onClick={logout}
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
