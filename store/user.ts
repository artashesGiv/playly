import type { UserInfo } from '@/types'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<Maybe<UserInfo>>(null)
  const balance = ref(0)

  const starpetsInfo = computed(() => userInfo.value?.starpets_info)

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
    userInfo,
    starpetsInfo,
    getUserInfo,
  }
})
