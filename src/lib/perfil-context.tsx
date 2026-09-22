import { createContext, useContext } from "react";

import type { Perfil } from "@/lib/perfil";

// Perfil resuelto por el layout (ver src/routes/_layout.tsx). Solo existe
// dentro de ese árbol, que ya garantiza un perfil no-nulo antes de renderizar
// el <Outlet />.
export const PerfilContext = createContext<Perfil | undefined>(undefined);

export function usePerfil(): Perfil {
  const perfil = useContext(PerfilContext);
  if (!perfil) throw new Error("usePerfil must be used within the app layout");
  return perfil;
}
