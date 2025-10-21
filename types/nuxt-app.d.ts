import type { IconsId, KeysLoading } from '@/types'

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

  type KeyLoading = KeysLoading

  type LanguageCode = 'en' | 'ru'

  type Agreements = 'term' | 'policy' | 'AML'

  type OnboardingStep = 1 | 2 | 3

  type Currency = 'RUB' | 'USD'

  type Payments =
    | 'bitcoin'
    | 'youmoney'
    | 'mastercard'
    | 'visa'
    | 'tether'
    | 'gpay'
    | 'cards'
    | 'SBP'

  type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T
  }
}

declare module 'nuxt/app' {
  interface NuxtApp {
    $baseApi: BaseApi
    $i18n: Composer
  }
}
