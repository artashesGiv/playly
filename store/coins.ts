import { useUserStore } from '@/store/user'
import type { TaskSettings } from '@/types'

export const useCoinsStore = defineStore('coins', () => {
  const { balance } = storeToRefs(useUserStore())

  const settings = ref<TaskSettings>({
    channel_join_crystal_amount: 300,
    ref_crystal_amount: 200,
  })

  const tapCoin = async (amount: number) => {
    await baseRequest({
      method: () => coinsAPI.tap({ tap_amount: amount }),
    })
  }

  const getTaskSettings = async () => {
    await baseRequest({
      method: () => coinsAPI.fetchTaskSettings(),
      callback: result => {
        settings.value = result
      },
    })
  }

  let timeout: Timeout
  let coins = 0

  const onTap = () => {
    coins += 1
    balance.value += 1
    clearTimeout(timeout)

    timeout = setTimeout(async () => {
      await tapCoin(coins)
      coins = 0
    }, 1000)
  }

  return {
    settings,
    onTap,
    getTaskSettings,
  }
})
