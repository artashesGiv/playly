import { useAuthStore } from '@/store'

export default defineNuxtPlugin(nuxtApp => {
  const { isAuth } = storeToRefs(useAuthStore())
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiBase

  const baseInstance = $fetch.create({
    baseURL: (apiUrl as string) || 'https://playzy-03ed4e830c91.herokuapp.com',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },

    // Перехватчик запросов
    onRequest({ request }) {
      console.log('Request to:', request)
    },
    // Перехватчик ответов
    onResponse({ request, response }) {
      console.log('Response from:', request, response)
    },
    // Перехватчик ошибок
    async onResponseError({ response }) {
      // Если сервер вернул 401 – значит токен/сессия недействительны
      if (response?.status === 401 && isAuth.value) {
        console.log('refresh')
      }

      // Любые другие ошибки
      console.error('Error in response:', response.status)
    },
  })

  nuxtApp.provide('baseApi', createApi(baseInstance, ''))
})
