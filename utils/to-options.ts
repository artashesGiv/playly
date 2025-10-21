import type { Option } from '@/types'

/**
 * Преобразует массив объектов в массив опций для селекта.
 *
 * @param arr - исходный массив
 * @param idKey - ключ для поля id (по умолчанию "id")
 * @param textKey - ключ для поля text (по умолчанию "text")
 */
export function toOptions<T extends Record<string, any>>(
  arr: T[],
  idKey: keyof T = 'id' as keyof T,
  textKey: keyof T = 'text' as keyof T,
): Option[] {
  return arr.map(item => ({
    id: item[idKey],
    text: item[textKey],
  }))
}
