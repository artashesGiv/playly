import type { PrimaryTheme } from '@/types/theme'

export type Clients =
  | 'playly'
  | 'channel'
  | 'channelDev'
  | 'playly_wl'
  | 'babkashop'

export type ClientsRoutes = 'robux' | 'shop' | 'profile'
export type ClientLink = { icon: Icons; src: string; text: string }

export type Client = {
  name: string
  link: ClientLink | ClientLink[]
  logo: string
  indexPage: string
  routes: ClientsRoutes[]
  primaryTheme: PrimaryTheme
}

export type ClientCreateData = {
  name: Client['name']
  link: Client['link']
  logo: Client['logo']
  indexPage?: Client['indexPage']
  routes?: Client['routes']
  primaryTheme?: Client['primaryTheme']
}
