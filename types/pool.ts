export type Pool<T extends string | number | symbol = 'id'> = PartialRecord<
  T,
  unknown
> & {
  [key: string | number]: any
}

export type RecordPool<T extends Pool<K>, K extends keyof T = 'id'> = Record<
  T[K],
  T
>
