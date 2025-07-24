import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        '@emotion/babel-plugin',
        { sourceMap: true, autoLabel: 'dev-only' }
      ],
    },
  })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined // 暂时禁用以隔离问题
      }
    }
  },
});