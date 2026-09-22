import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter,
} from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import { Toaster } from "sonner";

import { AppHeader } from "@/components/AppHeader";
import { UsernameGate } from "@/components/UsernameGate";
import { getUserService } from "@/core";
import { getPerfil, type Perfil, savePerfil } from "@/lib/perfil";
import { PerfilContext } from "@/lib/perfil-context";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "¡Juegolandia!" },
      { name: "description", content: "Juegos divertidos, coloridos y llenos de animación." },
      { property: "og:title", content: "¡Juegolandia!" },
      {
        property: "og:description",
        content: "Juegos divertidos, coloridos y llenos de animación.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}

// Único "layout" de la app: resuelve el perfil del jugador (localStorage +
// refresco contra el backend vía el core) y, si hay uno, renderiza el header
// y las rutas hijas. Sin perfil, pide nombre antes de mostrar cualquier ruta.
function AppShell() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    setPerfil(getPerfil());
    const onLogout = () => {
      setPerfil(null);
      // Cancela cualquier refetch en curso antes de borrar la caché: si no,
      // una respuesta que llegue tarde podría reescribirla justo después del
      // logout y "resucitar" al usuario anterior.
      void queryClient.cancelQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["user"] });
    };
    window.addEventListener("juegolandia:logout", onLogout);
    return () => window.removeEventListener("juegolandia:logout", onLogout);
  }, [queryClient]);

  // Refresca el perfil desde el backend cuando ya tenemos un usuario
  // registrado (perfil.id). Si falla (sin conexión, backend caído, etc.) no
  // pasa nada: seguimos usando el perfil local ya cargado.
  const { data: user } = useQuery({
    queryKey: ["user", perfil?.id],
    queryFn: () => getUserService().getUser(perfil!.id!),
    enabled: !!perfil?.id,
  });

  useEffect(() => {
    if (user) setPerfil(savePerfil(user));
  }, [user]);

  if (!perfil) return <UsernameGate onJoin={setPerfil} />;

  return (
    <PerfilContext.Provider value={perfil}>
      <AppHeader perfil={perfil} />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </PerfilContext.Provider>
  );
}
