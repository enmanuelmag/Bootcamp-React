import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@pages': '/src/pages',
      '@api': '/src/api',
      '@customTypes': '/src/types',
      '@utils': '/src/utils',
      '@constants': '/src/constants',
      '@context': '/src/context',
      '@store': '/src/store',
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: 3500, // you can replace this port with any port
  },
});
