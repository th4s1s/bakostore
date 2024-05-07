import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from '@svgr/rollup'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),  svgr()],
  server: {
    host: '0.0.0.0',
    proxy: {
      // Using '/api' as an example. Adjust according to your needs.
      '/api': {
        target: 'http://localhost:80',  // Target server
        changeOrigin: true,             // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
