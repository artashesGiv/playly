import { onBeforeRouteLeave } from 'vue-router'

export const useBackButton = () => {
  const router = useRouter()
  const { tg } = useTelegram()

  const handleBackButtonClick = () => {
    router.back()
  }

  onMounted(() => {
    if (!tg) return

    tg.BackButton.onClick(handleBackButtonClick)
    tg.BackButton.show()
  })

  onBeforeRouteLeave(() => {
    if (!tg) return

    tg.BackButton.offClick(handleBackButtonClick)
    tg.BackButton.hide()
  })
}
