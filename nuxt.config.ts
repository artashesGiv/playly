export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    'motion-v/nuxt',
    '@pinia/nuxt',
  ],

  css: ['@/assets/styles/reset.css', '@/assets/styles/vars/index.css'],
  vite: {
    server: {
      allowedHosts: true,
    },
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
    TG_BOT_TOKEN: process.env.TG_BOT_TOKEN,
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
  googleFonts: {
    families: {
      Inter: [300, 400, 600, 700, 800],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
    subsets: ['latin', 'cyrillic'],
  },
})