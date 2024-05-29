import { defineConfig } from 'vitest/config'
import path from 'path';

export default defineConfig({
  test: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: ['dotenv/config'],
  },
})