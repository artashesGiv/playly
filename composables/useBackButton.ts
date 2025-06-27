export const useBackButton = () => {
  const router = useRouter()
  const { tg } = useTelegram()

  onMounted(() => {
    tg?.BackButton.show()

    if (tg?.BackButton?.show) {
      tg.BackButton.onClick(() => router.back())
      tg.BackButton.show()
    }
  })

  onUnmounted(() => {
    tg?.BackButton?.hide?.()
  })
}
