import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  base: process.env.PAGES_BASE_PATH || '/',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  integrations: [preact({ compat: true })],
  vite: {
    plugins: [tailwindcss()],
    // postcss.config.mjs belongs to Next.js; Tailwind runs through the Vite plugin here.
    css: { postcss: {} }
  }
});
