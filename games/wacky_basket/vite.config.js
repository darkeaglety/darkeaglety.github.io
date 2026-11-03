import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 5176,
  },
  build: {
    emptyOutDir: true,
  },
});
