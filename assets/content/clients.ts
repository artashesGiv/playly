import type { Client, Clients } from '@/types'

export const clientsMap: Record<Clients, Client> = {
  playly: {
    name: 'Playly',
    link: 'https://t.me/+bmusTP1u7VMwMmJi',
    logo: '/images/main/logos/playly.png',
  },
  channel: {
    name: 'Test',
    link: 'https://t.me/artashesGiv',
    logo: '/images/main/logos/channel.png',
  },
  channelDev: {
    name: 'Channel Dev',
    link: 'https://t.me/artashesGiv',
    logo: '/images/main/logos/channelDev.png',
  },
  playlywl: {
    name: 'Playlywl',
    link: 'https://t.me/pohelon',
    logo: '/images/main/logos/channelDev.png',
  },
}
