import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PixelIcon } from "@/components/pixel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAdminAuthService } from "@/core";
import { saveAdminSession } from "@/lib/admin-session";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Ingreso admin — BooksQuest" }],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending } = useMutation({
    mutationFn: () => getAdminAuthService().login({ username, password }),
    onSuccess: (session) => {
      saveAdminSession(session);
      navigate({ to: "/admin" });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Usuario o contraseña incorrectos");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password || isPending) return;
    login();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="animate-px-pop w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <PixelIcon name="shield" scale={5} className="text-cyan" />
          <CardTitle role="heading" aria-level={1} className="pt-2 text-lg">
            Acceso de administrador
          </CardTitle>
          <CardDescription>Ingresa con tu usuario y contraseña de docente.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="admin-username">Usuario</Label>
              <Input
                id="admin-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Contraseña</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" variant="success" className="w-full" disabled={isPending}>
              {isPending ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
