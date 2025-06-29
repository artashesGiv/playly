export const useBackButton = () => {
  const router = useRouter()
  const { tg } = useTelegram()

  function handleBackButtonClick() {
    router.back()
  }

  onMounted(() => {
    tg?.BackButton.show()

    if (tg?.BackButton?.show) {
      tg.BackButton.onClick(handleBackButtonClick)
      tg.BackButton.show()
    }
  })

  onUnmounted(() => {
    tg?.BackButton.offClick(handleBackButtonClick)
    tg?.BackButton?.hide?.()
  })
}
