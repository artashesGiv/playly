import type { Client, ClientCreateData } from '@/types'

export const clientFabric = (data: ClientCreateData): Client => {
  return {
    name: data.name,
    link: data.link,
    logo: data.logo,

    indexPage: data.indexPage ?? '/shop-v2',
    routes: data.routes ?? ['robux', 'shop', 'profile'],
    primaryTheme: data.primaryTheme ?? 'playly',
  }
}
