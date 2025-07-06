/**
 * Реактивный обратный отсчёт до указанной даты-времени.
 * @param isoTarget ISO-строка, например "2025-07-09T10:13:28.390000+00:00"
 * @returns Ref<string> c текстом таймера
 */
export function useCountdown(isoTarget: string) {
  const output = ref('')

  let intervalId: ReturnType<typeof setInterval> | undefined

  const clear = () => intervalId && clearInterval(intervalId)

  const tick = () => {
    const diffMs = new Date(isoTarget).getTime() - Date.now()

    if (diffMs <= 0) {
      output.value = '0 мин'
      clear()
      return
    }

    const totalSec = Math.floor(diffMs / 1000)
    const hours = Math.floor(totalSec / 3600)
    const minutes = Math.floor((totalSec % 3600) / 60)
    const seconds = totalSec % 60

    if (hours > 0) {
      // ≥ 60 минут: показываем часы и минуты; секунды — при необходимости
      output.value =
        seconds === 0
          ? `${hours}:${minutes.toString().padStart(2, '0')}`
          : `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    } else {
      // < 60 минут: прежнее поведение
      output.value = `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }

  const start = () => {
    tick() // первоначальный расчёт
    intervalId = setInterval(tick, 1000)
  }

  onMounted(start)
  onUnmounted(clear)

  return output
}
