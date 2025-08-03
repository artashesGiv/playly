import type { AuthResponse, Rates } from '@/types'
import {
  useCasesStore,
  useCoinsStore,
  useFriendsStore,
  useItemsStore,
  useUserStore,
} from '@/store'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false)
  const data = ref<Maybe<AuthResponse>>(null)
  const rates = ref<Maybe<Rates>>(null)

  const authModalOpen = ref(false)

  const tokenData = ref<Maybe<TokenData>>(null)
  const refLink = ref('')

  const { getUserInfo } = useUserStore()
  const { getReferrals } = useFriendsStore()
  const { getItems } = useItemsStore()
  const { getCases } = useCasesStore()
  const { getTaskSettings } = useCoinsStore()
  const { popup } = useTelegram()

  const login = async (ref: string) => {
    const { tg } = useTelegram()

    return await baseRequest({
      method: () =>
        authAPI.auth({
          // init_data: tg?.initData || '',
          init_data: 'user=%7B%22id%22%3A430212610%2C%22first_name%22%3A%22%D0%90%D1%80%D1%82%D0%B0%D1%88%D0%B5%D1%81%22%2C%22last_name%22%3A%22%D0%94%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D1%8F%D0%BD%22%2C%22username%22%3A%22ArtashesGiv%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FFJtFwUP98ZYYSzPzTd1BGQHAjVUDIdzH6EmkxASZqFU.svg%22%7D&chat_instance=-4559555048510857361&chat_type=private&start_param=ref430212610&auth_date=1754197518&signature=HW0vNaoRSg6kf1b8ghC_-wCB9vu99UvIPL4OkB-x_tjXH2B-qhoLpkytcvzpoJeuEJtg4mBC_I2sWe6_PRrABQ&hash=30484f8d6ae7cc43359b0aa8b3c6c64202be56ea946babca8419c22c582a0efc',
          ref_code: ref,
          timezone_offset_minutes: new Date().getTimezoneOffset() * -1,
        }),
      callback: async result => {
        isAuth.value = true
        authModalOpen.value = false
        data.value = result
        tokenData.value = {
          access_token: result?.access_token,
          refresh_token: result?.refresh_token,
        }

        await Promise.all([
          getUserInfo(),
          getRefLink(),
          getTaskSettings(),
          getReferrals(),
        ])

        await Promise.all([getItems(), getCases(), getRates()])
      },
      errorCallback: () => {
        authModalOpen.value = true
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
    login,
    refresh,
    setStarpetsID,
    checkSubscription,
    setLang,
  }
})
