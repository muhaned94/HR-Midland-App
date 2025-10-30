// vite.config.js - الكود المُعدَّل لبيئة الإنتاج

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ تعريف الرابط الحي (Live URL) للسيرفر هنا
const VITE_API_URL = 'backend-production-2188.up.railway.app'; 

export default defineConfig({
  plugins: [react()],
  define: {
    // تمرير الرابط الحي إلى التطبيق كمتغير بيئة عام
    'process.env.VITE_API_URL': JSON.stringify(VITE_API_URL) 
  },
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