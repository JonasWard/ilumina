import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ilumina.ch',
  output: 'static',
  base: process.env.PAGES_BASE_PATH || '/',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  integrations: [preact({ compat: true })],
  vite: {
    plugins: [tailwindcss()],
    // postcss.config.mjs belongs to Next.js; Tailwind runs through the Vite plugin here.
    css: { postcss: {} },
    // Keep icons as cacheable files; inlining repeats them in every page and every swipe card.
    build: { assetsInlineLimit: 0 },
    // Bundle zustand when prerendering so its `react` import resolves to preact/compat like in the browser.
    environments: { prerender: { resolve: { noExternal: ['zustand'] } } }
  }
});
