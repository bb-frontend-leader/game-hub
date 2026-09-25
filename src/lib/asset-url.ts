/**
 * URL pública de un archivo de `public/` respetando el prefijo con el que se despliega la app
 * (`base` de vite.config.ts, expuesto como `import.meta.env.BASE_URL`, siempre con "/" al final).
 * Las rutas hardcodeadas ("/assets/...") no reciben el prefijo automáticamente.
 */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
