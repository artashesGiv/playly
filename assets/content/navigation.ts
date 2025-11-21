import { useAuthStore } from '@/store'
import { clientsMap } from '@/assets/content/clients'
import type { ClientsRoutes } from '@/types'

export const useNavigation = (): NavItem[] => {
  const { t } = useI18n()
  const { client } = storeToRefs(useAuthStore())
  const clientsRoutes = clientsMap[client.value]?.routes || [
    'robux',
    'shop',
    'profile',
  ]

  const allNav: Record<ClientsRoutes, NavItem> = {
    shop: {
      src: '/shop-v2',
      icon: 'buy-1',
      text: t('nav.shop'),
    },
    robux: {
      src: '/robux',
      icon: 'robux',
      text: t('nav.robux'),
    },
    profile: {
      src: '/profile',
      icon: 'profile-1',
      text: t('nav.profile'),
    },
  }

  return clientsRoutes
    .map(key => allNav[key])
    .filter((item): item is NavItem => Boolean(item))
}
