import type { Auth, CheckSubscriptionData } from '@/types'
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

  async refreshToken(
    payload: Auth.POST.Refresh.Payload,
  ): Promise<Auth.POST.Refresh.Response> {
    return await this._baseApi.post('/auth/refresh_token', null, {
      headers: {
        Refresh: `Bearer ${payload.refresh_token}`,
      },
    })
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
    return await this._baseApi.post('/auth/starpets_id', params)
  },

  async checkSubscription(): Promise<CheckSubscriptionData> {
    return await this._baseApi.post('/auth/check_subscription')
  },

  async fetchRates(): Promise<Auth.GET.Rates.Response> {
    return await this._baseApi.get('/crystals/rates')
  },

  async setLang(params: Auth.POST.SetLang.Payload) {
    return await this._baseApi.post('/auth/lang_code', params)
  },
}
