export async function fakeFetch<T>(data: T, delaySeconds = 1): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, delaySeconds * 1000)
  })
}
