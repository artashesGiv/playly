import { useAuthStore } from '@/store'

export const useShareLink = (text = '', link?: string) => {
  const { refLink } = storeToRefs(useAuthStore())

  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link || refLink.value)}&text=${text}`

  Telegram.WebApp.openTelegramLink(shareUrl)
}
