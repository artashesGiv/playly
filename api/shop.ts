import type { Shop } from '@/types'
import type { NuxtApp } from 'nuxt/app'

export const shopAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async getItems(
    params: Shop.GET.Items.Params,
  ): Promise<Shop.GET.Items.Response> {
    return await this._baseApi.get('/shop/outcome/items', {
      params,
    })
  },
  async buy(params: Shop.POST.Buy.Params): Promise<Shop.POST.Buy.Response> {
    return await this._baseApi.post('/shop/v1/buy', params)
  },
  async payment(
    payload: Shop.POST.Payment.Params,
  ): Promise<Shop.POST.Payment.Response> {
    return await this._baseApi.post('/freekassa/order', payload)
  },
}
