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

  type OnboardingStep = 1 | 2 | 3

  type Payments =
    | 'bitcoin'
    | 'youmoney'
    | 'mastercard'
    | 'visa'
    | 'tether'
    | 'gpay'
    | 'cards'
    | 'SBP'
}

declare module 'nuxt/app' {
  interface NuxtApp {
    $baseApi: BaseApi
    $i18n: Composer
  }
}
