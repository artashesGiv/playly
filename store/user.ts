import type { PromocodeData, UserInfo } from '@/types'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<Maybe<UserInfo>>(null)
  const balance = ref(0)

  const userPromocodeData = computed<PromocodeData>({
    get: () => ({
      promocode_rub2robux: userInfo.value?.promocode_rub2robux,
      promocode_rub2robux_expires_at:
        userInfo.value?.promocode_rub2robux_expires_at,
    }),
    set: (promocodeData: PromocodeData) => {
      if (userInfo.value) {
        userInfo.value = { ...userInfo.value, ...promocodeData }
      }
    },
  })

  const starpetsInfo = computed(() => userInfo.value?.starpets_info)
  const currencyBalance = computed(() => userInfo.value?.money_balance)

  const robuxBalance = computed<UserInfo['robux_balance']>(() => {
    if (userInfo.value) {
      return userInfo.value.robux_balance
    }

    return 0
  })

  const getUserInfo = async () => {
    await baseRequest({
      method: () => authAPI.fetchUserInfo(),
      callback: result => {
        userInfo.value = result
        balance.value = result.crystal_balance
      },
    })
  }

  return {
    balance,
    robuxBalance,
    currencyBalance,
    userInfo,
    starpetsInfo,
    userPromocodeData,
    getUserInfo,
  }
})
