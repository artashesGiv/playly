import {
  useHapticFeedback,
  useMiniApp,
  usePopup,
  useViewport,
} from 'vue-tg/latest'

export const useTelegram = () => {
  const tg = useMiniApp()
  const viewport = useViewport()
  const popup = usePopup()
  const haptic = useHapticFeedback()

  const user = tg?.initDataUnsafe.user
  return { tg, user, viewport, popup, haptic }
}
