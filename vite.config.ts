import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '$lib': path.resolve(__dirname, './src/lib'),
    },
  },
  build: {
    rollupOptions: {
      external: 'fs/promises',
    },
  },
})
