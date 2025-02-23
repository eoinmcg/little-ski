import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    hmr: {overlay: false},
    port: 5501,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
})
