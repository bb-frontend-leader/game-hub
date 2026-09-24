import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Users } from "lucide-react";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { RequireAdminSession } from "@/components/admin/RequireAdminSession";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Panel admin — BooksQuest" }],
  }),
  component: AdminHome,
});

const sections = [
  {
    to: "/admin/leaderboard" as const,
    icon: Trophy,
    title: "Tabla de clasificación",
    description: "Vista grande de los rankings, ideal para proyectar en el salón.",
  },
  {
    to: "/admin/users" as const,
    icon: Users,
    title: "Usuarios registrados",
    description: "Ve a todos los jugadores registrados. Elimina cuentas o reinicia puntajes.",
  },
];

function AdminHome() {
  return (
    <RequireAdminSession>
      {(session) => (
        <div className="min-h-screen bg-muted/40">
          <AdminHeader username={session.username} />
          <main className="mx-auto grid max-w-3xl gap-4 px-6 py-10 sm:grid-cols-2">
            {sections.map((s) => (
              <Link key={s.to} to={s.to}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <s.icon className="size-8 text-primary" />
                    <CardTitle>{s.title}</CardTitle>
                    <CardDescription>{s.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </main>
        </div>
      )}
    </RequireAdminSession>
  );
}
