import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      manifestFilename: 'site.webmanifest'
    })
  ],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      ecma: 2020
    }
  }
})
