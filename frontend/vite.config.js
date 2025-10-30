// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // **********************************************
  // ** الإضافة الجديدة لتحديد عنوان الـ Backend **
  // **********************************************
  server: {
    // توجيه كل طلب يبدأ بـ /api إلى المنفذ 5000
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // عنوان الخادم الخلفي
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // **********************************************
});