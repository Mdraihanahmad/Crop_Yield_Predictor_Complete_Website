import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If deploying with unified server (Express serves /api + static), proxy only used in dev.
// Optionally set VITE_API_BASE in production build to point elsewhere.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // matches server default now
        changeOrigin: true,
      }
    }
  },
  define: {
    __BUILD_MODE__: JSON.stringify(mode)
  }
}));
