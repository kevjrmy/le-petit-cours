import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Icons from 'unplugin-icons/vite'
import IconsResolver from "unplugin-icons/resolver"
import Components from "unplugin-vue-components/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        id: '/',
        name: 'Le Petit Cours',
        short_name: 'le-petit-cours',
        description: 'Petite app pour apprendre le français',
        start_url: '/',
        scope: '/',
        theme_color: '#F6F8FB',
        background_color: '#F6F8FB',
        display: 'standalone',
        orientation: 'portrait-primary',
        lang: 'fr',
        dir: 'ltr',

        icons: [{
          src: '/pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        }, {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        }, {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        }, {
          src: '/maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        }],
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})