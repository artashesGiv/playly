import { useIsLoadingStore } from '@/store'

export type BaseRequestParams<T = unknown> = {
  method: (...args: any[]) => Promise<T>
  callback?: (result: T) => void
  finallyCallback?: () => void
  errorCallback?: (e: any) => void
  keyLoading?: KeyLoading | KeyLoading[]
}

export const baseRequest = async <T = unknown>({
  method,
  callback,
  finallyCallback,
  errorCallback,
  keyLoading,
}: BaseRequestParams<T>) => {
  const { addKeyLoading, removeKeyLoading } = useIsLoadingStore()

  try {
    if (keyLoading) {
      addKeyLoading(keyLoading)
    }

    const data = await method()

    if (callback) {
      callback(data)
    }

    return data
  } catch (e: any) {
    if (errorCallback) {
      errorCallback(e)
    }

    console.error('BASE REQUEST', e)
    throw Error(e)
  } finally {
    if (keyLoading) {
      removeKeyLoading(keyLoading)
    }

    if (finallyCallback) {
      finallyCallback()
    }
  }
}
