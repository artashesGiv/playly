// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/fonts', '@nuxt/eslint'],

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
          'content': "default-src 'self' https://*.telegram.org;",
        },
      ],
    },
  },
  nitro: {
    preset: 'vercel',
  },
})
