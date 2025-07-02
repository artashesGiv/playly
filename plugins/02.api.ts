import { useAuthStore } from '@/store'
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export default defineNuxtPlugin(nuxtApp => {
  const { refresh } = useAuthStore()
  const { isAuth, tokenData } = storeToRefs(useAuthStore())
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiBase

  let refreshPromise: Promise<void> | null = null

  const baseInstance = $fetch.create({
    baseURL: (apiUrl as string) || 'https://playzy-03ed4e830c91.herokuapp.com',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },

    // Перехватчик запросов
    onRequest({ request, options }) {
      if (isAuth.value && tokenData.value?.access_token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${tokenData.value.access_token}`,
        } as Headers
      }

      console.log('Request to:', request)
    },
    // Перехватчик ответов
    onResponse({ request, response }) {
      console.log('Response from:', request, response)
    },
    // Перехватчик ошибок
    async onResponseError({ request, options, response }) {
      // Если сервер вернул 401 – значит токен/сессия недействительны
      if (response?.status === 401 && tokenData.value?.access_token) {
        if (!refreshPromise) {
          refreshPromise = refresh().finally(() => {
            refreshPromise = null
          })
        }

        // Дожидаемся обновления токена (неважно, мы инициировали или нет).
        try {
          await refreshPromise
        } catch (refreshErr) {
          // Обработка неудачного refresh – можно разлогинить пользователя.
          console.error('Не удалось обновить токен', refreshErr)
          throw response
        }

        // Повторяем исходный запрос с новым токеном.
        await baseInstance(request as NitroFetchRequest, {
          ...(options as NitroFetchOptions<any>),
          headers: {
            ...(options?.headers as Headers),
            Authorization: `Bearer ${tokenData.value?.access_token ?? ''}`,
          },
        })
      }
    },
  })

  nuxtApp.provide('baseApi', createApi(baseInstance, ''))
})
