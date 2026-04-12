// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

// https://astro.build/config
// Phase 2: swap `node` adapter for `@astrojs/vercel` and remove the mode option
export default defineConfig({
  site: 'https://yourdomain.com', // update per-site
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['yjs', 'react', 'react-dom'],
    },
  },
  integrations: [react(), svelte(), keystatic()]
});