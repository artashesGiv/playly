import type { Coins } from '@/types'
import type { NuxtApp } from 'nuxt/app'

export const coinsAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async tap(payload: Coins.POST.Tap.Payload): Promise<Coins.POST.Tap.Response> {
    return await this._baseApi.post('/crystals/tap', payload)
  },

  async fetchTaskSettings(): Promise<Coins.GET.TaskSettings.Response> {
    return await this._baseApi.get('/crystals/tasks')
  },
}
