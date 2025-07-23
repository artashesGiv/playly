export type BaseRequestParams<T = unknown> = {
  method: (...args: any[]) => Promise<T>
  callback?: (result: T) => void
  finallyCallback?: () => void
  errorCallback?: (e: any) => void
}

export const baseRequest = async <T = unknown>({
  method,
  callback,
  finallyCallback,
  errorCallback,
}: BaseRequestParams<T>) => {
  try {
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
    if (finallyCallback) {
      finallyCallback()
    }
  }
}
