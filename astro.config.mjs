import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  // AÑADE ESTA LÍNEA
  // Le dice a Astro/Vite que todas las rutas estáticas deben usar este prefijo.
  integrations: [svelte({ extensions: ['.svelte'] })],
});