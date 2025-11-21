import type { Client } from '@/types'

export const channel: Client = clientFabric({
  name: 'Test',
  link: [
    {
      icon: 'telegram',
      src: 'https://t.me/artashesGiv',
      text: 'Telegram',
    },
    {
      icon: 'youtube',
      src: 'https://www.youtube.com/',
      text: 'YouTube',
    },
  ],
  logo: '/images/main/logos/channel.png',
  indexPage: '/robux',
  routes: ['robux', 'profile'],
  primaryTheme: 'pink',
})
