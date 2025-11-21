import type { Client } from '@/types'

export const channelDev: Client = clientFabric({
  name: 'Channel Dev',
  link: {
    icon: 'telegram',
    src: 'https://t.me/artashesGiv',
    text: 'Telegram',
  },
  logo: '/images/main/logos/channelDev.png',
  primaryTheme: 'red',
})
