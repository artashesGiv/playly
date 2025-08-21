import { useUserStore } from '@/store/user'
import type { TaskSettings } from '@/types'

const REQUEST_INTERVAL_MS = 400
const MAX_BATCH_SIZE = 20

export const useCoinsStore = defineStore('coins', () => {
  const { $i18n } = useNuxtApp()
  const t = $i18n.t.bind($i18n)

  const { popup, haptic } = useTelegram()
  const { getUserInfo } = useUserStore()
  const { balance } = storeToRefs(useUserStore())

  const settings = ref<TaskSettings>({
    channel_join_crystal_amount: 100,
    ref_crystal_amount: 500,
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
        settings.value = { ...settings.value, ...result }
      },
    })
  }

  /* ---------- реактивное состояние ---------- */
  const queue = ref<number[]>([]) // накопленные клики
  const timerId = ref<ReturnType<typeof setInterval> | null>(null)
  const sending = ref(false) // защита от параллельной отправки

  /* ---------- публичное API ---------- */
  function onTap(amount = 1) {
    haptic.impactOccurred('heavy')

    balance.value += amount // оптимистичное обновление UI
    queue.value.push(amount) // добавляем в очередь
    if (!timerId.value) startTimer()
  }

  /* ---------- внутренняя логика ---------- */
  async function flushBatch() {
    if (sending.value) return
    if (queue.value.length === 0) {
      stopTimer()
      return
    }

    sending.value = true
    const batchSize = Math.min(queue.value.length, MAX_BATCH_SIZE)
    const batchAmount = queue.value
      .splice(0, batchSize)
      .reduce((a, b) => a + b, 0)

    try {
      await tapCoin(batchAmount) // реальный вызов API
    } catch (e) {
      console.error(e)
      await getUserInfo() // синхронизируем реальные данные
      popup?.showAlert?.(t('coins.tapError'))
      queue.value.length = 0 // обнуляем очередь
      stopTimer()
    } finally {
      sending.value = false
    }
  }

  function startTimer() {
    timerId.value = setInterval(flushBatch, REQUEST_INTERVAL_MS)
  }
  function stopTimer() {
    if (timerId.value) clearInterval(timerId.value)
    timerId.value = null
  }

  return {
    settings,
    onTap,
    getTaskSettings,
  }
})
