import type { UserInfo } from '@/types'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<Maybe<UserInfo>>(null)

  const balance = computed(() => {
    if (userInfo.value) {
      return userInfo.value.crystal_balance
    }

    return 0
  })

  const robuxBalance = computed(() => {
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
      },
    })
  }

  return {
    balance,
    robuxBalance,
    userInfo,
    getUserInfo,
  }
})
