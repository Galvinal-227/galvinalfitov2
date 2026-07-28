import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig(({command, mode}) => ({
  server: {
   port: 9000,
  },
  preview: {
 port: 9000,
 host: mode === 'production' ? '0.0.0.0' : 'localhost',
},
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  }
}))
