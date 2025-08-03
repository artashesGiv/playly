import type { FetchOptions } from 'ofetch'

type Api = <T = unknown>(url: string, options?: FetchOptions) => Promise<T>
type ApiWithBody = <T = unknown, B extends object = object>(
  url: string,
  body?: B,
  options?: FetchOptions,
) => Promise<T>

export type BaseApi = {
  get: Api
  post: ApiWithBody
  put: ApiWithBody
  patch: ApiWithBody
  delete: ApiWithBody
}
