/**
 * Мост совместимости Nuxt 3 / @nuxtjs/i18n
 * Размещаем в любой папке, указанной в `tsconfig include`.
 */

import 'vue'
import '@vue/runtime-core'

/* ------------------------------------------------------------------
 * 1. Расширяем СТАРЫЙ namespace (@vue/runtime-core)
 *    — нужен только для зависимостей, которые ещё не перешли на 'vue'
 * ------------------------------------------------------------------*/
declare module '@vue/runtime-core' {
  // Пустое расширение «вытягивает» типы из нового namespace 'vue',
  // поэтому сторонний код, который до сих пор делает
  //   import { ComponentCustomProperties } from '@vue/runtime-core'
  // увидит те же свойства, что и в 'vue'.
  interface ComponentCustomProperties {}
  interface ComponentCustomOptions {}
}

/* ------------------------------------------------------------------
 * 2. Расширяем НОВЫЙ namespace (vue)
 *    — сюда добавляем типы, которых не хватает после обновления
 * ------------------------------------------------------------------*/
declare module 'vue' {
  interface ComponentCustomProperties {
    /**
     * Перевод строки по ключу.
     * @example this.$t('common.save')
     */
    $t(
      key: string,
      // позиционные или именованные параметры интерполяции
      params?: Record<string, unknown> | unknown[],
    ): string

    /**
     * Плюрализация.
     * @example this.$tc('posts', postCount)
     */
    $tc(
      key: string,
      choice?: number,
      params?: Record<string, unknown> | unknown[],
    ): string

    /**
     * Форматирование даты/времени.
     * @example this.$d(new Date(), 'short')
     */
    $d(value: number | Date, key?: string, locale?: string): string

    /**
     * Форматирование чисел.
     * @example this.$n(1234.5, 'currency')
     */
    $n(value: number, key?: string, locale?: string): string

    /**
     * Доступ к «сырому» объекту перевода (часто для v-for).
     * @example const menu = this.$tm('navigation')
     */
    $tm(key: string): unknown

    /**
     * Генерация локализованного пути к странице/роуту.
     * @example this.$localePath('/about', 'en')
     */
    $localePath(path: string, locale?: string): string
  }
}
