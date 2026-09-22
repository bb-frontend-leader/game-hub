import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { type AdminSession, getAdminSession } from "@/lib/admin-session";

// Guard imperativo para las páginas /admin/*: si no hay sesión de admin en
// localStorage, redirige a /admin/login. Mismo estilo que el gate de perfil
// en __root.tsx (sin usar beforeLoad del router).
export function RequireAdminSession({
  children,
}: {
  children: (session: AdminSession) => React.ReactNode;
}) {
  const navigate = useNavigate();
  const [session, setSession] = useState<AdminSession | null>(null);

  useEffect(() => {
    const found = getAdminSession();
    if (!found) {
      navigate({ to: "/admin/login" });
      return;
    }
    setSession(found);
  }, [navigate]);

  if (!session) return null;

  return <>{children(session)}</>;
}
