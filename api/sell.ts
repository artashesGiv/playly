import type { NuxtApp } from 'nuxt/app'
import type { Sell } from '@/types'

export const sellAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async getItems(
    params: Sell.GET.Items.Params,
  ): Promise<Sell.GET.Items.Response> {
    return await this._baseApi.get('/shop/income/items', {
      params,
    })
  },
  async sell(params: Sell.POST.Buy.Params): Promise<Sell.POST.Buy.Response> {
    return await this._baseApi.post('/shop/sell', params)
  },
}
