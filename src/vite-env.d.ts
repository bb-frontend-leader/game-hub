/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Base URL of the backend REST API (e.g. "https://api.example.com" or
   * "https://api.example.com/api/v1"). Provided by the backend team; see
   * .env.example. Read lazily by src/core/infrastructure/config/api-config.ts.
   */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
