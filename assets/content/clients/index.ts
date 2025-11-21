import type { Client, Clients } from '@/types'
import { babkashop } from './babkashop'
import { playly_wl } from './playly_wl'
import { channelDev } from './channelDev'
import { channel } from './channel'
import { clientFabric } from '@/utils/client-fabric'

export const clientsMap: Record<Clients, Client> = {
  // DEV
  playly: clientFabric({
    name: 'Playly',
    link: {
      icon: 'telegram',
      src: 'https://t.me/+bmusTP1u7VMwMmJi',
      text: 'Telegram',
    },
    logo: '/images/main/logos/playly.png',
  }),
  channel,
  channelDev,

  // PROD
  playly_wl,
  babkashop,
}
