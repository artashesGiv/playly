import type { NuxtApp } from 'nuxt/app'
import type { Items } from '@/types'

export const itemsAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async fetchItems() {
    return await this._baseApi.get('/item/my_items')
  },

  async fetchItem(
    params: Items.GET.Item.Params,
  ): Promise<Items.GET.Item.Response> {
    return await this._baseApi.get('/item/my_item', {
      params,
    })
  },

  async sellItem(params: Items.POST.Sell.Params) {
    return await this._baseApi.post('/item/sell', params)
  },

  async withdrawItem(params: Items.POST.Withdraw.Params) {
    return await this._baseApi.post('/item/withdraw', params)
  },
}
