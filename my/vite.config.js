import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'


export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'stats.html',
      open: false,
    }),
  ],
  build: {
    outDir: '/var/www/capu.it.com',
    // outDir: './dist',
    emptyOutDir: true,
  },
});
