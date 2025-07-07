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

  async fetchWithdraws(): Promise<Robux.GET.Withdraws.Response> {
    return await this._baseApi.get('/robux_withdraws/withdraws')
  },
}
