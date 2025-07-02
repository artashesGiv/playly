import type { AuthResponse } from '@/types'
import { useUserStore } from '@/store'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false)
  const data = ref<Maybe<AuthResponse>>(null)

  const tokenData = ref<Maybe<TokenData>>(null)

  const { getUserInfo } = useUserStore()

  const login = async () => {
    const { tg } = useTelegram()

    await baseRequest({
      method: () =>
        authAPI.auth({
          init_data: tg?.initData || '',
          ref_code: tg?.initDataUnsafe.start_param || '',
          timezone_offset_minutes: 180,
        }),
      callback: async result => {
        isAuth.value = true
        data.value = result
        tokenData.value = {
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        }

        await getUserInfo()
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

  return {
    isAuth,
    data,
    tokenData,
    login,
    refresh,
  }
})
