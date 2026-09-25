import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";

import { AppHeader } from "@/components/AppHeader";
import {
  PixelArt,
  PixelGround,
  PixelIcon,
  PixelSky,
  PixelSprite,
  SHEETS,
} from "@/components/pixel";
import { CODE_404, PX } from "@/components/pixel/pixel-art";
import { buttonVariants } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { UsernameGate } from "@/components/UsernameGate";
import { getUserService } from "@/core";
import { assetUrl } from "@/lib/asset-url";
import { getPerfil, type Perfil, savePerfil } from "@/lib/perfil";
import { PerfilContext } from "@/lib/perfil-context";
import { cn } from "@/lib/utils";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col overflow-x-clip">
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-16 pt-10 text-center">
        <PixelArt
          rows={CODE_404}
          palette={{ x: PX.gold }}
          scale={14}
          title="Error 404"
          className="px-outline animate-px-bob-big"
        />
        <h1 className="mt-4 text-xl uppercase leading-relaxed text-star sm:text-2xl">
          ¡Nivel no encontrado!
        </h1>
        <p className="max-w-md text-xl text-muted-foreground">
          La página que buscas no existe o cambió de lugar.
        </p>
        <Link to="/" className={cn(buttonVariants({ size: "lg" }))}>
          <PixelIcon name="arrow-left" scale={2} />
          Volver al menú
        </Link>
      </main>

      <PixelGround>
        <div
          className="px-ground__actor"
          style={{ left: "calc(50% - 80px)", bottom: "calc(var(--ground-h, 96px) - 14px)" }}
        >
          <PixelSprite sheet={SHEETS.hero} scale={5} frames={2} fps={2} />
        </div>
      </PixelGround>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <PixelIcon name="alert" scale={6} className="animate-px-bob-big text-red" />
      <h1 className="text-xl uppercase leading-relaxed text-star sm:text-2xl">
        Esta página no cargó
      </h1>
      <p className="max-w-md text-xl text-muted-foreground">
        Algo salió mal de nuestro lado. Puedes reintentar o volver al inicio.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className={cn(buttonVariants({ size: "lg" }))}
        >
          <PixelIcon name="reset" scale={2} />
          Reintentar
        </button>
        <a href={import.meta.env.BASE_URL} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          Ir al inicio
        </a>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#140d33" },
      { title: "BooksQuest" },
      { name: "description", content: "Juegos divertidos, coloridos y llenos de animación." },
      { property: "og:title", content: "BooksQuest" },
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
        href: "https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Silkscreen:wght@400;700&display=swap",
      },
      // Íconos generados con scripts/generate-favicon.mjs. El .ico cubre navegadores viejos y
      // Safari; los modernos toman el SVG (nítido a cualquier tamaño).
      { rel: "icon", href: assetUrl("favicon.ico"), sizes: "16x16 32x32 48x48" },
      { rel: "icon", href: assetUrl("favicon.svg"), type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: assetUrl("apple-touch-icon.png") },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
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
      <PixelSky />
      <div className="relative z-10">
        <AppShell />
      </div>
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

// Único "layout" de la app: resuelve el perfil del jugador (localStorage +
// refresco contra el backend vía el core) y, si hay uno, renderiza el header
// y las rutas hijas. Sin perfil, pide nombre antes de mostrar cualquier ruta.
// Las rutas /admin/* quedan fuera de este flujo: tienen su propio login y
// guard (ver RequireAdminSession), así que el gate del jugador se salta ahí.
function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
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
    window.addEventListener("booksquest:logout", onLogout);
    return () => window.removeEventListener("booksquest:logout", onLogout);
  }, [queryClient]);

  // Refresca el perfil desde el backend cuando ya tenemos un usuario
  // registrado (perfil.id). Si falla (sin conexión, backend caído, etc.) no
  // pasa nada: seguimos usando el perfil local ya cargado.
  const { data: user } = useQuery({
    queryKey: ["user", perfil?.id],
    queryFn: () => getUserService().getUser(perfil!.id!),
    enabled: !isAdminRoute && !!perfil?.id,
  });

  useEffect(() => {
    if (user) setPerfil(savePerfil(user));
  }, [user]);

  if (isAdminRoute) return <Outlet />;

  if (!perfil) return <UsernameGate onJoin={setPerfil} />;

  return (
    <PerfilContext.Provider value={perfil}>
      <AppHeader perfil={perfil} />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </PerfilContext.Provider>
  );
}
