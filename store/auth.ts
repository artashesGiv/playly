import type { AuthResponse, Clients, Rates } from '@/types'
import { useItemsStore, useUserStore } from '@/store'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false)
  const client = ref<Clients>(null as never as Clients)
  const data = ref<Maybe<AuthResponse>>(null)
  const rates = ref<Maybe<Rates>>(null)

  const authModalOpen = ref(false)
  const errorModalOpen = ref(false)

  const tokenData = ref<Maybe<TokenData>>(null)
  const refLink = ref('')

  const { getUserInfo } = useUserStore()
  // const { getReferrals } = useFriendsStore()
  const { getItems } = useItemsStore()
  // const { getCases } = useCasesStore()
  // const { getTaskSettings } = useCoinsStore()
  const { popup } = useTelegram()

  const login = async (ref: string) => {
    const { tg } = useTelegram()

    return await baseRequest({
      method: () =>
        authAPI.auth({
          init_data: tg?.initData || '',
          ref_code: ref,
          timezone_offset_minutes: new Date().getTimezoneOffset() * -1,
          telegram_channel_name: client.value,
        }),
      callback: async result => {
        isAuth.value = true
        authModalOpen.value = false
        errorModalOpen.value = false
        data.value = result
        tokenData.value = {
          access_token: result?.access_token,
          refresh_token: result?.refresh_token,
        }

        await Promise.all([
          getUserInfo(),
          // getRefLink(),
          // getTaskSettings(),
          // getReferrals(),
        ])

        await Promise.all([getItems(), /*getCases(),*/ getRates()])
      },
      errorCallback: () => {
        errorModalOpen.value = true
      },
    })
  }

  const refresh = async () => {
    await baseRequest({
      method: () =>
        authAPI.refreshToken({
          refresh_token: tokenData.value?.refresh_token || '',
        }),
      callback: result => {
        tokenData.value = {
          access_token: result.access_token,
          refresh_token: tokenData?.value?.refresh_token || '',
        }
      },
    })
  }

  // const getRefLink = async () => {
  //   await baseRequest({
  //     method: () => authAPI.fetchRefLink(),
  //     callback: ({ ref_link }) => {
  //       refLink.value = ref_link
  //     },
  //   })
  // }

  const setStarpetsID = async (id: string) => {
    await baseRequest({
      method: () => authAPI.setStarpetsID({ starpets_user_id: id }),
      callback: async () => {
        popup?.showAlert?.('Starpets ID успешно привязан')
        await getUserInfo()
      },
      errorCallback: () => {
        popup?.showAlert?.('Starpets ID не найден, проверьте введенные данные')
      },
    })
  }

  const checkSubscription = async () => {
    return await baseRequest({
      method: () => authAPI.checkSubscription(),
    })
  }

  const getRates = async () => {
    await baseRequest({
      method: () => authAPI.fetchRates(),
      callback: result => (rates.value = result),
    })
  }

  const setLang = async (lang: LanguageCode) => {
    await baseRequest({
      method: () =>
        authAPI.setLang({
          lang_code: lang,
        }),
    })
  }

  return {
    isAuth,
    data,
    tokenData,
    refLink,
    rates,
    authModalOpen,
    errorModalOpen,
    client,
    login,
    refresh,
    setStarpetsID,
    checkSubscription,
    setLang,
  }
})
