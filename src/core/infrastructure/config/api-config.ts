// The backend team has not shared the API base URL yet. This is read lazily
// (only when a core function is actually called — see fetch-api.datasource.ts)
// so importing `@/core`, and building/booting the app, never fails just
// because this isn't configured today.
export function getApiBaseUrl(): string {
  const value = import.meta.env.VITE_API_URL;
  if (!value) {
    throw new Error(
      "VITE_API_URL is not set. Copy .env.example to .env (or .env.local), set " +
        "VITE_API_URL to the base URL the backend team provides, and restart the dev server.",
    );
  }
  return value;
}
