
// @ts-nocheck


export const localeCodes =  [
  "en",
  "ru"
]

export const localeLoaders = {
  en: [
    {
      key: "locale_en_46json_cccf3cff",
      load: () => import("#nuxt-i18n/cccf3cff" /* webpackChunkName: "locale_en_46json_cccf3cff" */),
      cache: true
    }
  ],
  ru: [
    {
      key: "locale_ru_46json_1acf34f5",
      load: () => import("#nuxt-i18n/1acf34f5" /* webpackChunkName: "locale_ru_46json_1acf34f5" */),
      cache: true
    }
  ]
}

export const vueI18nConfigs = [
  () => import("#nuxt-i18n/4933c89f" /* webpackChunkName: "config_i18n_46config_46ts_4933c89f" */)
]

export const nuxtI18nOptions = {
  restructureDir: "i18n",
  experimental: {
    localeDetector: "",
    switchLocalePathLinkSSR: false,
    autoImportTranslationFunctions: false,
    typedPages: true,
    typedOptionsAndMessages: "all",
    generatedLocaleFilePathFormat: "absolute",
    alternateLinkCanonicalQueries: false,
    hmr: true
  },
  bundle: {
    compositionOnly: true,
    runtimeOnly: false,
    fullInstall: true,
    dropMessageCompiler: false,
    optimizeTranslationDirective: true
  },
  compilation: {
    strictMessage: true,
    escapeHtml: false
  },
  customBlocks: {
    defaultSFCLang: "json",
    globalSFCScope: false
  },
  locales: [
    {
      code: "en",
      name: "English",
      language: "en-US",
      files: [
        {
          path: "/Users/artashes/work/personal/playly/i18n/locales/en.json",
          cache: undefined
        }
      ]
    },
    {
      code: "ru",
      name: "Русский",
      language: "ru-RU",
      files: [
        {
          path: "/Users/artashes/work/personal/playly/i18n/locales/ru.json",
          cache: undefined
        }
      ]
    }
  ],
  defaultLocale: "ru",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  trailingSlash: false,
  defaultLocaleRouteNameSuffix: "default",
  strategy: "no_prefix",
  lazy: true,
  langDir: "locales",
  rootRedirect: undefined,
  detectBrowserLanguage: {
    alwaysRedirect: false,
    cookieCrossOrigin: false,
    cookieDomain: null,
    cookieKey: "i18n_redirected",
    cookieSecure: false,
    fallbackLocale: "",
    redirectOn: "root",
    useCookie: true
  },
  differentDomains: false,
  baseUrl: "",
  customRoutes: "page",
  pages: {},
  skipSettingLocaleOnNavigate: false,
  types: "composition",
  debug: false,
  parallelPlugin: false,
  multiDomainLocales: false,
  i18nModules: []
}

export const normalizedLocales = [
  {
    code: "en",
    name: "English",
    language: "en-US",
    files: [
      {
        path: "/Users/artashes/work/personal/playly/i18n/locales/en.json",
        cache: undefined
      }
    ]
  },
  {
    code: "ru",
    name: "Русский",
    language: "ru-RU",
    files: [
      {
        path: "/Users/artashes/work/personal/playly/i18n/locales/ru.json",
        cache: undefined
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false
export const hasPages = true

export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
/** client **/

/** client-end **/