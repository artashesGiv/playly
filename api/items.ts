import type { Cases } from '@/types'
import type { NuxtApp } from 'nuxt/app'

export const itemsAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async fetchCases(): Promise<Cases.GET.Cases.Response> {
    return await this._baseApi.get('/cases')
  },

  async fetchCaseItems({
    case_id,
  }: Cases.GET.Items.Params): Promise<Cases.GET.Items.Response> {
    return await this._baseApi.get(`/cases/items/${case_id}`)
  },

  async openCase(
    params: Cases.POST.Open.Params,
  ): Promise<Cases.POST.Open.Response> {
    return await this._baseApi.post('/crystals/tasks/open', {
      body: params,
    })
  },
}
