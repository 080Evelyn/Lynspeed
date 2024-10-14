// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk: split out larger dependencies
          vendor: ['react', 'react-dom', 'your-other-large-libraries'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the warning limit if needed
  },
});
