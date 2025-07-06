import { useAuthStore } from '@/store'

export const useShareLink = (text = '') => {
  const { refLink } = storeToRefs(useAuthStore())

  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(refLink.value)}&text=${text}`

  Telegram.WebApp.openTelegramLink(shareUrl)
}
