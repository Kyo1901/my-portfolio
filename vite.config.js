import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// GitHub Pages 프로젝트 페이지 배포 경로(/my-portfolio/)에 맞춰 base 설정
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/',
});
