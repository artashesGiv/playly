import type { NuxtApp } from 'nuxt/app'
import type { Items } from '@/types'

export const itemsAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async fetchItems() {
    return await this._baseApi.get('/item/v2/my_items')
  },

  async fetchItem({
    user_item_id,
  }: Items.GET.Item.Params): Promise<Items.GET.Item.Response> {
    return await this._baseApi.get(`/item/v2/my_item/${user_item_id}`)
  },

  async sellItem(params: Items.POST.Sell.Params) {
    return await this._baseApi.post('/item/sell', params)
  },

  async sellItemRobux(params: Items.POST.SellRobux.Params) {
    return await this._baseApi.post('/item/sell/robux', params)
  },

  async withdrawItem(
    params: Items.POST.Withdraw.Params,
  ): Promise<Items.POST.Withdraw.Response> {
    return await this._baseApi.post('/item/withdraw', params)
  },
}
