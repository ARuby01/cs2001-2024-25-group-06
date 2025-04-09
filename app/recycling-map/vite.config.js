// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Remove or comment out if you don't actually need the Tailwind Vite plugin
// import tailwindcssVite from 'tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    // tailwindcssVite(),
  ]})