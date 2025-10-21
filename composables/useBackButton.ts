import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

let activeInstances = 0
const callbackStack: Array<() => void> = []

export const useBackButton = (callback?: () => void) => {
  const router = useRouter()
  const backButton = window.Telegram?.WebApp.BackButton

  const handleBackButtonClick = () => {
    const cb = callbackStack[callbackStack.length - 1]
    if (cb) {
      cb()
      return
    }

    const hasBack = !!window.history.state?.back
    if (hasBack) {
      router.back()
    } else {
      router.replace('/')
    }
  }

  onMounted(() => {
    if (!backButton) return

    const cb = callback ?? (() => router.back())
    callbackStack.push(cb)

    if (activeInstances === 0) {
      backButton.onClick?.(handleBackButtonClick)
      backButton.show?.()
    }
    activeInstances++
  })

  onUnmounted(() => {
    if (!backButton) return

    activeInstances--
    callbackStack.pop()

    if (activeInstances === 0) {
      backButton.hide?.()
    }
  })
}
