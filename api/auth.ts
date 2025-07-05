import type { Auth } from '@/types'
import type { NuxtApp } from 'nuxt/app'

export const authAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async auth(
    payload: Auth.POST.Login.Payload,
  ): Promise<Auth.POST.Login.Response> {
    return await this._baseApi.post('/auth/telegram', payload)
  },

  async refreshToken(): Promise<Auth.POST.Login.Response> {
    return await this._baseApi.post('/auth/refresh_token')
  },

  async fetchUserInfo(): Promise<Auth.GET.UserInfo.Response> {
    return await this._baseApi.get('/auth/user_info')
  },

  async fetchRefLink(): Promise<Auth.GET.RefLink.Response> {
    return await this._baseApi.get('/auth/ref_link')
  },

  async fetchReferrals(): Promise<Auth.GET.Referrals.Response> {
    return await this._baseApi.get('/auth/referrals')
  },

  async setStarpetsID(params: Auth.POST.Starpets.Params) {
    return await this._baseApi.post('/auth/starpets_id', {
      body: params,
    })
  },
}
