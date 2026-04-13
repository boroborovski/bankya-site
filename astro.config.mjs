// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walkDir(dir) {
  let files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    statSync(full).isDirectory() ? files.push(...walkDir(full)) : files.push(full);
  }
  return files;
}

const contentFiles = walkDir('./content');

// https://astro.build/config
export default defineConfig({
  site: 'https://bplrbankya.com',
  output: 'server',
  security: {
    checkOrigin: false,
  },
  adapter: vercel({
    includeFiles: contentFiles,
  }),
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
