import type { AuthResponse } from '@/types'
import { useCoinsStore, useUserStore } from '@/store'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false)
  const data = ref<Maybe<AuthResponse>>(null)

  const tokenData = ref<Maybe<TokenData>>(null)
  const refLink = ref('')

  const { getUserInfo } = useUserStore()
  const { getTaskSettings } = useCoinsStore()

  const login = async () => {
    const { tg } = useTelegram()

    await baseRequest({
      method: () =>
        authAPI.auth({
          init_data: tg?.initData || '',
          ref_code: tg?.initDataUnsafe.start_param || '',
          timezone_offset_minutes: new Date().getTimezoneOffset() * -1,
        }),
      callback: async result => {
        isAuth.value = true
        data.value = result
        tokenData.value = {
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        }

        await Promise.all([getUserInfo(), getRefLink(), getTaskSettings()])
      },
    })
  }

  const refresh = async () => {
    await baseRequest({
      method: () => authAPI.refreshToken(),
      callback: result => {
        tokenData.value = {
          access_token: result.access_token,
          refresh_token: tokenData?.value?.refresh_token || '',
        }
      },
    })
  }

  const getRefLink = async () => {
    await baseRequest({
      method: () => authAPI.fetchRefLink(),
      callback: ({ ref_link }) => {
        refLink.value = ref_link
      },
    })
  }

  const setStarpetsID = async (id: string) => {
    await baseRequest({
      method: () => authAPI.setStarpetsID({ starpets_id: id }),
    })
  }

  return {
    isAuth,
    data,
    tokenData,
    refLink,
    login,
    refresh,
    setStarpetsID,
  }
})
