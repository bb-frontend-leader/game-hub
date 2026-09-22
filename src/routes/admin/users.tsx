import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { RequireAdminSession } from "@/components/admin/RequireAdminSession";
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
    return <p className="py-12 text-center text-muted-foreground">Cargando usuarios...</p>;
  }

  if (!users || users.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
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
            <TableCell className="font-medium">
              <span className="mr-2" aria-hidden>
                {user.emoji}
              </span>
              {user.name}
            </TableCell>
            <TableCell className="text-right">{user.totalPoints}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isResetting}
                  onClick={() => resetScore(user.id)}
                >
                  <RotateCcw className="size-4" />
                  Reiniciar
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={isDeleting}>
                      <Trash2 className="size-4" />
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
                      <AlertDialogAction onClick={() => deleteUser(user.id)}>
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
        <div className="min-h-screen bg-muted/40">
          <AdminHeader username={session.username} />
          <main className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="mb-6 text-3xl font-bold">Usuarios registrados</h1>
            <div className="rounded-xl border bg-card p-4">
              <UsersTable token={session.token} />
            </div>
          </main>
        </div>
      )}
    </RequireAdminSession>
  );
}
