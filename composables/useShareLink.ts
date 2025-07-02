import { useAuthStore } from '@/store'

export const useShareLink = (text = '') => {
  const { refLink } = storeToRefs(useAuthStore())

  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(refLink.value)}&text=${encodeURIComponent(text)}`

  Telegram.WebApp.openTelegramLink(shareUrl)
}
