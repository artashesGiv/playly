import type { Market } from '@/types'
import type { NuxtApp } from 'nuxt/app'

export const marketAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async getItems(
    params: Market.GET.Items.Params,
  ): Promise<Market.GET.Items.Response> {
    return await this._baseApi.get('/market/items', {
      params,
    })
  },
  async buy(params: Market.POST.Buy.Params): Promise<Market.POST.Buy.Response> {
    return await this._baseApi.post('/market/buy', params)
  },
  async payment(
    payload: Market.POST.Payment.Params,
  ): Promise<Market.POST.Payment.Response> {
    return await this._baseApi.post('/freekassa/order', payload)
  },
}
