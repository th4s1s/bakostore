import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Using '/api' as an example. Adjust according to your needs.
      '/api': {
        target: 'http://localhost:8080',  // Target server
        changeOrigin: true,             // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
