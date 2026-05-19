import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

function readClientRevision() {
  const src = readFileSync(new URL('./src/constants.js', import.meta.url), 'utf8');
  return src.match(/CLIENT_DATA_REVISION\s*=\s*'([^']+)'/)?.[1] ?? 'unknown';
}

export default defineConfig({
  // Relative base so the built game works under games/UltimateTowerDefence/dist/ on TyGames.
  base: './',
  server: {
    host: true,
    port: 5173,
    headers: {
      // Avoid stale ES modules after balance edits (common on LAN / tablets).
      'Cache-Control': 'no-store',
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    emptyOutDir: true,
  },
  plugins: [
    {
      name: 'inject-utd-revision',
      transformIndexHtml(html) {
        const revision = readClientRevision();
        return html.replace(
          '</head>',
          `    <meta name="utd-revision" content="${revision}" />\n  </head>`,
        );
      },
    },
  ],
});
