import type { Ref } from 'vue'
import { isRef, onUnmounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * Реактивный обратный отсчёт до указанного времени (timestamp).
 * @param tsTarget  Реактивный или обычный timestamp (Ref<number | string> | number | string)
 * @param onFinish  Необязательный коллбек, вызывается при завершении таймера
 * @returns Ref<string> c текстом таймера
 */
export function useCountdown(
  tsTarget:
    | Ref<number | string | null | undefined>
    | number
    | string
    | null
    | undefined,
  onFinish?: () => void,
): Ref<string> {
  const output = ref<string>('')

  const { t } = useI18n()

  let intervalId: ReturnType<typeof setInterval> | null = null

  const clear = (): void => {
    if (intervalId) clearInterval(intervalId)
    intervalId = null
  }

  const toMs = (val: number | string): number | null => {
    if (typeof val === 'string') {
      const parsedDate = Date.parse(val)
      if (!isNaN(parsedDate)) return parsedDate
      return null
    }

    return val < 1_000_000_000_000 ? val * 1000 : val
  }

  const getTargetMs = (): number | null => {
    const raw = isRef(tsTarget) ? tsTarget.value : tsTarget
    if (!raw) return null
    return toMs(raw)
  }

  const tick = (): void => {
    const targetMs = getTargetMs()
    if (!targetMs) {
      output.value = ''
      return
    }

    const diffMs = targetMs - Date.now()
    if (!Number.isFinite(diffMs)) {
      output.value = ''
      return
    }

    if (diffMs <= 0) {
      output.value = '00:00:00'
      clear()
      if (onFinish) onFinish()
      return
    }

    const totalSec = Math.floor(diffMs / 1000)
    const days = Math.floor(totalSec / 86400)
    const hours = Math.floor((totalSec % 86400) / 3600)
    const minutes = Math.floor((totalSec % 3600) / 60)
    const seconds = totalSec % 60

    const dayWord = t('countdown.day')
    const hourWord = t('countdown.hour')
    const minWord = t('countdown.min')
    const secondWord = t('countdown.second')

    if (days >= 1) {
      output.value = `${days} ${dayWord} ${hours} ${hourWord} ${minutes} ${minWord}`
    } else {
      output.value = `${hours} ${hourWord} ${minutes} ${minWord} ${seconds} ${secondWord}`
    }
  }

  const start = (): void => {
    tick()
    intervalId = setInterval(tick, 1000)
  }

  watchEffect(onCleanup => {
    const targetMs = getTargetMs()
    clear()

    if (!targetMs) {
      output.value = ''
      return
    }

    start()
    onCleanup(clear)
  })

  onUnmounted(clear)

  return output
}
