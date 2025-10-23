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
  image: {
    provider: 'none',
    dir: 'public',
    formats: ['webp', 'avif'],
    screens: { xs: 320, md: 768, lg: 1280 },
  },

  build: {
    transpile: ['gsap'],
  },

  nitro: {
    compressPublicAssets: { gzip: true, brotli: true },
    publicAssets: [{ dir: 'public', baseURL: '/', maxAge: 60 * 60 * 24 * 365 }],
  },

  css: ['@/assets/styles/reset.css', '@/assets/styles/vars/index.css'],
  vite: {
    server: {
      allowedHosts: true,
    },
    build: {
      target: 'es2022',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
        },
        format: { comments: false },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('lottie-web')) return 'lottie'
            if (id.includes('vue-i18n')) return 'i18n'
            if (id.includes('motion-')) return 'motion'
          },
        },
      },
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
      link: [
        { rel: 'preload', as: 'image', href: '/hero.webp' },
        { rel: 'preconnect', href: 'https://mc.yandex.ru', crossorigin: '' },
        { rel: 'preconnect', href: 'https://telegram.org', crossorigin: '' },
      ],
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, interactive-widget=overlays-content',
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
  googleFonts: {
    families: {
      Inter: [500, 600, 700],
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
      { code: 'en', name: 'English', file: 'en/index.ts', language: 'en-US' },
      { code: 'ru', name: 'Русский', file: 'ru/index.ts', language: 'ru-RU' },
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
    enabled: process.env.NODE_ENV === 'development',
  },
})
