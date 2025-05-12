import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'


export default defineConfig({
  optimizeDeps: {
    include: ['styled-reset'],
  },
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-styled-components"]
      }
    }),
    visualizer({
      filename: 'stats.html',
      open: false,
    }),
  ],
  build: {
    outDir: '/var/www/capu.it.com',
    emptyOutDir: true,
  },
});
