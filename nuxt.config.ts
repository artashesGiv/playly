export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    'motion-v/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-lottie',
    'nuxt-eruda',
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
    layoutTransition: {
      name: 'fade',
      mode: 'out-in',
    },
    head: {
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1',
        },
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
      Inter: [300, 400, 500, 600, 700, 800],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
    subsets: ['latin', 'cyrillic'],
  },
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'ru',
    lazy: true,
    langDir: 'locales',
    locales: [
      { code: 'en', name: 'English', file: 'en.json', language: 'en-US' },
      { code: 'ru', name: 'Русский', file: 'ru.json', language: 'ru-RU' },
    ],
    experimental: {
      typedOptionsAndMessages: 'all',
    },
    vueI18n: 'i18n.config.ts',
  },
  lottie: {
    componentName: 'Lottie',
    lottieFolder: '/assets/lottie',
  },
  eruda: {
    enabled: true,
  },
})
