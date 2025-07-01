import type { FetchOptions } from 'ofetch'

type Api = <T = unknown>(
  url: string,
  options?: FetchOptions,
) => Promise<BaseResponse<T>>
type ApiWithBody = <T = unknown, B extends object = object>(
  url: string,
  body?: B,
  options?: FetchOptions,
) => Promise<BaseResponse<T>>

export type BaseApi = {
  get: Api
  post: ApiWithBody
  put: ApiWithBody
  patch: ApiWithBody
  delete: ApiWithBody
}

export type TokenData = {
  access_token: string
  refresh_token: string
  id_token: string
}
