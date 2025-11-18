import type { Clients } from '@/types'

export const clientsIdMap: Record<Clients, number> = {
  playly: 1,
  channel: 2,
}

export const clientsNameMap: Record<Clients, string> = {
  playly: 'Playly',
  channel: 'Test',
}

export const clientsTgLinkMap: Record<Clients, string> = {
  playly: 'https://t.me/+bmusTP1u7VMwMmJi',
  channel: 'https://t.me/artashesGiv',
}
