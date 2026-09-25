import { createFileRoute, Link } from "@tanstack/react-router";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { RequireAdminSession } from "@/components/admin/RequireAdminSession";
import { PixelIcon } from "@/components/pixel";
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
    icon: "trophy" as const,
    title: "Tabla de clasificación",
    description: "Vista grande de los rankings, ideal para proyectar en el salón.",
  },
  {
    to: "/admin/users" as const,
    icon: "users" as const,
    title: "Usuarios registrados",
    description: "Ve a todos los jugadores registrados. Elimina cuentas o reinicia puntajes.",
  },
];

function AdminHome() {
  return (
    <RequireAdminSession>
      {(session) => (
        <div className="min-h-screen">
          <AdminHeader username={session.username} />
          <main className="mx-auto grid max-w-3xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6">
            <h1 className="sr-only">Panel de administración</h1>
            {sections.map((s) => (
              <Link key={s.to} to={s.to} className="group block">
                <Card className="h-full transition-transform duration-100 ease-[steps(2)] group-hover:-translate-y-1">
                  <CardHeader>
                    <PixelIcon name={s.icon} scale={4} className="text-cyan" />
                    <CardTitle className="pt-2">{s.title}</CardTitle>
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
