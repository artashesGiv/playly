import type { Friend } from '@/types'

export const useFriendsStore = defineStore('friends', () => {
  const friends = ref<Friend[]>([])

  const getReferrals = async () => {
    await baseRequest({
      method: () => authAPI.fetchReferrals(),
      callback: result => {
        friends.value = result
      },
    })
  }

  return { friends, getReferrals }
})
