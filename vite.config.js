import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    // Helpful on Windows + OneDrive/Documents: native file events can be flaky.
    watch: {
      usePolling: true,
      interval: 300,
    },
    hmr: {
      overlay: true,
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  clearScreen: false,
})
