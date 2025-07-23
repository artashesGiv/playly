import type { BaseApi } from '@/types'
import type { $Fetch } from 'nitropack'
import type { FetchOptions } from 'ofetch'

const createUrlWithPrefix = (url: string, prefix: string) => {
  const parts = ['', prefix, url]

  const normalized = parts
    .filter(Boolean)
    .map(part => part.replace(/^\/+|\/+$/g, ''))

  return `/${normalized.join('/')}`
}

export const createApi = (instance: $Fetch, prefix: string): BaseApi => ({
  get: async <T>(url: string, options?: FetchOptions) =>
    await instance<T>(createUrlWithPrefix(url, prefix), {
      ...options,
      method: 'GET',
    }),

  post: async <T, B extends object>(
    url: string,
    body?: B,
    options?: FetchOptions,
  ) =>
    await instance<T>(createUrlWithPrefix(url, prefix), {
      ...options,
      method: 'POST',
      body,
    }),
  put: <T, B extends object>(url: string, body?: B, options?: FetchOptions) =>
    instance<T>(createUrlWithPrefix(url, prefix), {
      ...options,
      method: 'PUT',
      body,
    }),
  patch: async <T, B extends object>(
    url: string,
    body?: B,
    options?: FetchOptions,
  ) =>
    await instance<T>(createUrlWithPrefix(url, prefix), {
      ...options,
      method: 'PATCH',
      body,
    }),
  delete: async <T>(url: string, options?: FetchOptions) =>
    await instance<T>(createUrlWithPrefix(url, prefix), {
      ...options,
      method: 'DELETE',
    }),
})
