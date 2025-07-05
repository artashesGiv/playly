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
  async setUserInfo(
    payload: Robux.POST.UserInfo.Payload,
  ): Promise<Robux.POST.UserInfo.Response> {
    return await this._baseApi.post(
      '/robux_withdraws/roblox_user_info',
      payload,
    )
  },
  async fetchRobloxPlaces({
    user_id,
  }: Robux.GET.Place.Params): Promise<Robux.GET.Place.Response> {
    return await this._baseApi.get(
      `/robux_withdraws/roblox_places?user_id=${user_id}`,
    )
  },
  async setRobloxPlace(
    payload: Robux.POST.Place.Payload,
  ): Promise<Robux.POST.Place.Response> {
    return await this._baseApi.post('/robux_withdraws/roblox_place', payload)
  },
  async fetchGamepasses({
    universe_id,
  }: Robux.GET.Gamepass.Params): Promise<Robux.GET.Gamepass.Response> {
    return await this._baseApi.get(
      `/robux_withdraws/gamepasses?universe_id=${universe_id}`,
    )
  },
  async setGamepass(
    payload: Robux.POST.Gamepass.Payload,
  ): Promise<Robux.POST.Gamepass.Response> {
    return await this._baseApi.post('/robux_withdraws/gamepass', payload)
  },
  async setWithdraw(
    payload: Robux.POST.Withdraw.Payload,
  ): Promise<Robux.POST.Withdraw.Response> {
    return await this._baseApi.post('/robux_withdraws/withdraw', payload)
  },
  async setPrice(
    payload: Robux.POST.Price.Payload,
  ): Promise<Robux.POST.Price.Response> {
    return await this._baseApi.post('/robux_withdraws/price', payload)
  },
  async fetchCurrentWithdraw(): Promise<Robux.GET.CurrenWithdraw.Response> {
    return await this._baseApi.get('/robux_withdraws/curr_withdraw')
  },
  async fetchWithdraw(): Promise<Robux.GET.Withdraws.Response> {
    return await this._baseApi.get('/robux_withdraws/withdraws')
  },

  async sellRobux({ robux_amount }: Robux.POST.Sell.Params) {
    return await this._baseApi.post(
      `/robux_purchases/buy?robux_amount=${robux_amount}`,
    )
  },
}
