/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GOOGLE_SCRIPT_URL: string;
  readonly API_SECRET: string;
  // añade más variables aquí...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}