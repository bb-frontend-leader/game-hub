import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import path from "path";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Prefijo público bajo el que nginx monta la app. Debe empezar y terminar con "/"; "./" rompe el
// SSR (emite "/./assets/..."). Lo reutilizan el router (import.meta.env.BASE_URL) y Nitro.
const BASE = "/game-hub/";

export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
    }),
    viteReact(),
    // baseURL hace que Nitro sirva rutas y estáticos bajo el mismo prefijo (nginx no lo recorta).
    nitro({ baseURL: BASE }),
  ],
  base: BASE,
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
      "@core": `${path.resolve(__dirname, "src/components/games")}/`,
    },
  },
});
