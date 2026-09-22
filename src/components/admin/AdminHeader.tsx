import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

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
    <header className="flex items-center justify-between border-b bg-card px-6 py-4">
      <Link to="/admin" className="flex items-center gap-2 text-lg font-semibold">
        <ShieldCheck className="size-5 text-primary" />
        Panel de administración
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{username}</span>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="size-4" />
          Salir
        </Button>
      </div>
    </header>
  );
}
