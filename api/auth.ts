import type { Auth } from '@/types'
import type { NuxtApp } from 'nuxt/app'

export const authAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async auth(payload: Auth.POST.Login.Payload) {
    return await this._baseApi.post<Auth.POST.Login.Response>(
      '/auth/telegram',
      payload,
    )
  },
}
