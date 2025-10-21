import type { NuxtApp } from 'nuxt/app'
import type { Items, PersonalCaseItem } from '@/types'

export const itemsAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async fetchItems(): Promise<PersonalCaseItem[]> {
    return await this._baseApi.get('/item/v2/my_items')
  },

  async fetchItem({
    user_item_id,
  }: Items.GET.Item.Params): Promise<Items.GET.Item.Response> {
    return await this._baseApi.get(`/item/v2/my_item/${user_item_id}`)
  },

  async fetchItemUser({
    user_item_id,
  }: Items.GET.UserItem.Params): Promise<Items.GET.UserItem.Response> {
    return await this._baseApi.get(`/item?user_item_id=${user_item_id}`)
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

  async shareItem({
    user_item_id,
  }: Items.GET.Share.Params): Promise<Items.GET.Share.Response> {
    return await this._baseApi.get(`/item/share?user_item_id=${user_item_id}`)
  },

  async shareRobux(): Promise<Items.GET.Share.Response> {
    return await this._baseApi.get('/item/robux/share')
  },

  async fetchRobuxData({
    message_id,
  }: Items.GET.UserRobux.Params): Promise<Items.GET.UserRobux.Response> {
    return await this._baseApi.get(`/auth/robux/share?message_id=${message_id}`)
  },
}
