import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // این خط را اضافه می‌کنیم
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // پلاگین React را اینجا اضافه می‌کنیم
      plugins: [react()], 
      
      // این خط مهم‌ترین بخش جدید است
      base: '/majaleh360-dashmin/', 

      define: {
        // اگر کلید API وجود نداشت، یک رشته خالی "" قرار بده
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ""),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || "")
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});