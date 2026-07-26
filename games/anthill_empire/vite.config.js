import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base so the built game works under games/anthill_empire/dist/ on TyGames.
  base: './',
  server: {
    host: true,
    port: 5174,
  },
  build: {
    emptyOutDir: true,
  },
});
