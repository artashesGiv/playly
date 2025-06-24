// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/fonts', '@nuxt/eslint'],

  css: ['@/assets/styles/reset.css', '@/assets/styles/vars/index.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/index.scss" as *;',
        },
      },
    },
  },
  imports: {
    dirs: ['composables/**', 'api/**'],
  },
  runtimeConfig: {
    public: {
      TG_BOT_NAME: process.env.TG_BOT_NAME,
    },
    TG_BOT_TOKEN: process.env.TG_BOT_TOKEN, // только сервер
  },
  app: {
    head: {
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          // 'content': [
          //   "default-src 'self' https://*.telegram.org",
          //   "script-src  'self' 'unsafe-inline' https://*.telegram.org",
          //   "style-src   'self' 'unsafe-inline'",
          //   "connect-src 'self' https://api.telegram.org https://*.telegram.org ws:",
          // ].join('; '),
        },
      ],
    },
  },
  nitro: {
    preset: 'vercel',
  },
})
