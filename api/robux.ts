import type { NuxtApp } from 'nuxt/app'
import type { Robux } from '@/types'

export const robuxAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async fetchUserInfo(params: string): Promise<Robux.GET.UserInfo.Response> {
    return await this._baseApi.get(
      `/robux_withdraws/roblox_user_info?username=${params}`,
    )
  },

  async fetchRobloxPlaces({
    user_id,
  }: Robux.GET.Place.Params): Promise<Robux.GET.Place.Response> {
    return await this._baseApi.get(
      `/robux_withdraws/roblox_places?user_id=${user_id}`,
    )
  },

  async fetchGamepasses({
    robux_amount,
    universe_id,
  }: Robux.GET.Gamepass.Params): Promise<Robux.GET.Gamepass.Response> {
    return await this._baseApi.get(
      `/robux_withdraws/gamepasses?robux_amount=${robux_amount}&universe_id=${universe_id}`,
    )
  },

  async fetchGamepassPrice(
    params: Robux.GET.GamepassPrice.Params,
  ): Promise<Robux.GET.GamepassPrice.Response> {
    return await this._baseApi.get(`/robux_withdraws/check_gamepass_price`, {
      params,
    })
  },

  async setWithdraw(
    payload: Robux.POST.Withdraw.Payload,
  ): Promise<Robux.POST.Withdraw.Response> {
    return await this._baseApi.post('/robux_withdraws/withdraw', payload)
  },

  async fetchTransactions(): Promise<Robux.GET.Transaction.Response> {
    return await this._baseApi.get('/robux_withdraws/robux_transactions')
  },

  async payment(
    payload: Robux.POST.Payment.Payload,
  ): Promise<Robux.POST.Payment.Response> {
    return await this._baseApi.post('/freekassa/order', payload)
  },

  async fetchRobuxStock(): Promise<Robux.GET.Stock.Response> {
    return await this._baseApi.get('/robux_withdraws/stock_robux')
  },
}
