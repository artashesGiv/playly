import type { ShopV2 } from '@/types'
import type { NuxtApp } from 'nuxt/app'

export const shopV2API = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async getGames(
    params: ShopV2.GET.Games.Params,
  ): Promise<ShopV2.GET.Games.Response> {
    return await this._baseApi.get('/shop/outcome/games', {
      params,
    })
  },

  async getItems({
    filters,
    from_price,
    to_price,
    ...params
  }: ShopV2.POST.Items.Params): Promise<ShopV2.POST.Items.Response> {
    return await this._baseApi.post(
      '/shop/v2/outcome/items',
      { filters, from_price, to_price },
      {
        params: {
          ...params,
          limit: 999,
        },
      },
    )
  },

  async buy(params: ShopV2.POST.Buy.Params): Promise<ShopV2.POST.Buy.Response> {
    return await this._baseApi.post('/shop/v1/buy', params)
  },

  async payment(
    payload: ShopV2.POST.Payment.Params,
  ): Promise<ShopV2.POST.Payment.Response> {
    return await this._baseApi.post('/freekassa/order', payload)
  },

  async fetchWithdraw(
    params: ShopV2.GET.Withdraw.Params,
  ): Promise<ShopV2.GET.Withdraw.Response> {
    return await this._baseApi.get('/shop/withdraw', {
      params,
    })
  },

  async fetchWithdraws(): Promise<ShopV2.GET.Withdraws.Response> {
    return await this._baseApi.get('/shop/withdraws')
  },
}
