import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { RequireAdminSession } from "@/components/admin/RequireAdminSession";
import { PixelIcon } from "@/components/pixel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type AdminUserSummary, getAdminService } from "@/core";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [{ title: "Usuarios — Panel admin" }],
  }),
  component: AdminUsers,
});

function UsersTable({ token }: { token: string }) {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => getAdminService().listUsers(token),
  });

  const invalidateUsers = () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] });

  const { mutate: resetScore, isPending: isResetting } = useMutation({
    mutationFn: (userId: string) => getAdminService().resetUserScore(token, userId),
    onSuccess: () => {
      toast.success("Puntaje reiniciado");
      invalidateUsers();
    },
    onError: (error) => {
      console.error(error);
      toast.error("No pudimos reiniciar el puntaje");
    },
  });

  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: (userId: string) => getAdminService().deleteUser(token, userId),
    onSuccess: () => {
      toast.success("Usuario eliminado");
      invalidateUsers();
    },
    onError: (error) => {
      console.error(error);
      toast.error("No pudimos eliminar el usuario");
    },
  });

  if (isLoading) {
    return (
      <p role="status" className="animate-px-blink py-12 text-center text-xl text-muted-foreground">
        Cargando usuarios...
      </p>
    );
  }

  if (!users || users.length === 0) {
    return (
      <p className="py-12 text-center text-xl text-muted-foreground">
        Todavía no hay usuarios registrados.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Jugador</TableHead>
          <TableHead className="text-right">Puntos totales</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: AdminUserSummary) => (
          <TableRow key={user.id}>
            <TableCell className="text-xl font-semibold">
              <span className="mr-2" aria-hidden>
                {user.emoji}
              </span>
              {user.name}
            </TableCell>
            <TableCell className="text-right font-pixel text-base font-bold text-gold">
              {user.totalPoints}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isResetting}
                  onClick={() => resetScore(user.id)}
                >
                  <PixelIcon name="reset" scale={2} />
                  Reiniciar
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={isDeleting}>
                      <PixelIcon name="trash" scale={2} />
                      Eliminar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Eliminar a {user.name}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción borra al usuario y no se puede deshacer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction variant="destructive" onClick={() => deleteUser(user.id)}>
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function AdminUsers() {
  return (
    <RequireAdminSession>
      {(session) => (
        <div className="min-h-screen">
          <AdminHeader username={session.username} />
          <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
            <h1 className="px-title mb-8 text-[1.5rem] sm:text-[2rem]">Usuarios registrados</h1>
            <Card className="p-2 sm:p-4">
              <UsersTable token={session.token} />
            </Card>
          </main>
        </div>
      )}
    </RequireAdminSession>
  );
}
