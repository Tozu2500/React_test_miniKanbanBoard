import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// vitest/config re-exports defineConfig with the `test` field typed, so
// this one config file covers both `vite dev`/`vite build` and `vitest`.
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
})
