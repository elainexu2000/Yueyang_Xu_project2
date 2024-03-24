import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Remove braces around react

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', 
  },
});

