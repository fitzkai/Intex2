import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com; " +
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com https://accounts.google.com; " +
        "img-src 'self' data: https://localhost:5000 http://localhost:4000; https://intex2-4-8-backend-bkh8h0caezhmfhcj.eastus-01.azurewebsites.net/" +
        "frame-ancestors 'none'; " +
        "font-src 'self' fonts.gstatic.com data:; " +
        "connect-src 'self' https://localhost:5000 https://accounts.google.com https://oauth2.googleapis.com; https://intex2-4-8-backend-bkh8h0caezhmfhcj.eastus-01.azurewebsites.net/" +
        "object-src 'none'; " +
        "base-uri 'self'; " +
        "form-action 'self'; " +
        "frame-src 'self' https://accounts.google.com https://oauth2.googleapis.com;",
    },

    cors: {
      origin: [
        'http://localhost:3000',
        'https://victorious-ocean-0d29f0010.6.azurestaticapps.net',
      ],
      credentials: true,
    },
  },
});
