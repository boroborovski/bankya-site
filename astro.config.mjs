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
  site: 'https://bplrbankya.com', // update per-site
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['yjs', 'react', 'react-dom'],
    },
    optimizeDeps: {
      exclude: ['@keystatic/astro'],
    },
    server: {
      watch: {
        // Required when project lives on a Windows drive mounted in WSL2 (/mnt/*)
        usePolling: true,
        interval: 1000,
      },
    },
  },
  integrations: [react(), svelte(), keystatic()]
});
