import { useUserStore } from '@/store/user'
import type { TaskSettings } from '@/types'

export const useCoinsStore = defineStore('coins', () => {
  const { $i18n } = useNuxtApp()
  const t = $i18n.t.bind($i18n)

  const { tg } = useTelegram()
  const { getUserInfo } = useUserStore()
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
      try {
        await tapCoin(coins)
      } catch (e) {
        await getUserInfo()
        console.error(e)
        tg?.showAlert(t('coins.tapError'))
      }
      coins = 0
    }, 500)
  }

  return {
    settings,
    onTap,
    getTaskSettings,
  }
})
