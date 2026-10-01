import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { SessionExpiredError } from "@/core";
import { handleSessionExpired } from "@/lib/session-expiry";

import { routeTree } from "./routeTree.gen";

// Mismo número de reintentos que React Query usa por defecto.
const DEFAULT_RETRIES = 3;

export const getRouter = () => {
  // Un token vencido en cualquier consulta o mutación cierra la sesión (ver
  // handleSessionExpired). `router` se asigna abajo, antes de cualquier error.
  const onError = (error: unknown): void => handleSessionExpired(error, router);
  const queryClient = new QueryClient({
    queryCache: new QueryCache({ onError }),
    mutationCache: new MutationCache({ onError }),
    defaultOptions: {
      queries: {
        // Reintentar con un token vencido no sirve: solo retrasa el aviso.
        retry: (failureCount, error) =>
          !(error instanceof SessionExpiredError) && failureCount < DEFAULT_RETRIES,
      },
    },
  });

  const router = createRouter({
    routeTree,
    // Toma el `base` de vite.config.ts para que los links y el SSR resuelvan bajo el prefijo de nginx.
    basepath: import.meta.env.BASE_URL,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
