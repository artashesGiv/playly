import type { IconsId } from '@/types'

export {}
declare global {
  type Maybe<T> = null | undefined | T
  type Timeout = ReturnType<typeof setTimeout>
  type AsyncFunction<P = unknown, T = void> = (params?: P) => Promise<T>
  type Icons = IconsId
  // type BaseResponse<T = unknown> = {
  //   data: T
  // }
}

declare module 'nuxt/app' {
  // interface NuxtApp {
  // }
}
