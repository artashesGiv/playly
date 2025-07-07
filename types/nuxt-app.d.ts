import type { IconsId } from '@/types'

export {}
declare global {
  type Maybe<T> = null | undefined | T
  type Timeout = ReturnType<typeof setTimeout>
  type AsyncFunction<P = unknown, T = void> = (params?: P) => Promise<T>
  type Icons = IconsId
  type BaseResponse<T = unknown> = {
    data: T
  }
  type NavItem = {
    src: string
    icon: IconsId | 'mascot'
    text: string
  }
  type TokenData = {
    access_token: string
    refresh_token: string
  }

  type LanguageCode = 'en' | 'ru'

  type Agreements = 'term' | 'policy' | 'AML'
}

declare module 'nuxt/app' {
  interface NuxtApp {
    $baseApi: BaseApi
    $i18n: Composer
  }
}
