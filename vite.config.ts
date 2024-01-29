import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
// https://vitejs.dev/config/

// .env 파일 로드
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/banners': {
        target: process.env.VITE_BASE_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
