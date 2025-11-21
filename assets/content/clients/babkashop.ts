import type { Client } from '@/types'

export const babkashop: Client = clientFabric({
  name: 'Бабка Шоп',
  link: [
    {
      icon: 'telegram',
      src: 'https://t.me/babkashow',
      text: 'Бабка Шоу',
    },
    {
      icon: 'youtube',
      src: 'https://youtube.com/@itzbabkashow',
      text: 'Бабка Шоу',
    },
  ],
  logo: '/images/main/logos/babkashop.png',
  indexPage: '/robux',
  routes: ['robux', 'profile'],
  primaryTheme: 'babkashop',
})
