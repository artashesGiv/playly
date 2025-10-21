import type { Cases } from '@/types'
import type { NuxtApp } from 'nuxt/app'

export const caseAPI = {
  get _baseApi() {
    return (useNuxtApp() as NuxtApp).$baseApi
  },

  async fetchCases(
    params?: Cases.GET.Cases.Params,
  ): Promise<Cases.GET.Cases.Response> {
    return await this._baseApi.get(`/cases`, {
      params,
    })
  },

  async fetchCaseItems({
    case_id,
  }: Cases.GET.Items.Params): Promise<Cases.GET.Items.Response> {
    return await this._baseApi.get(`/cases/items/v3/${case_id}`)
  },

  async openCase({
    case_id,
  }: Cases.POST.Open.Params): Promise<Cases.POST.Open.Response> {
    return await this._baseApi.post(`/cases/v2/open?case_id=${case_id}`)
  },

  async fetchRobuxCaseItems({
    case_id,
  }: Cases.GET.Items.Params): Promise<Cases.GET.Items.Response> {
    return await this._baseApi.get(`/cases/items/robux/v3/${case_id}`)
  },

  async openRobuxCase({
    case_id,
  }: Cases.POST.Open.Params): Promise<Cases.POST.Open.Response> {
    return await this._baseApi.post(`/cases/v3/open/robux?case_id=${case_id}`)
  },

  async fetchCasesOnboarding(): Promise<Cases.GET.Cases.Response> {
    return await this._baseApi.get(`/cases/onboarding`)
  },
}
