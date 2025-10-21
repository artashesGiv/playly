import type { Pool, RecordPool } from '@/types'

export const toPool = <T extends Pool<K>, K extends keyof T>(
  array: T[],
  key?: K,
) =>
  Object.fromEntries(
    array.map(item => [item[key ?? 'id'], item]),
  ) as RecordPool<T, K>
