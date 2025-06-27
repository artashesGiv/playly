export const useNavigation = (): NavItem[] => {
  const { t } = useI18n()

  return [
    {
      src: '/',
      icon: 'mascot',
      text: t('nav.coins'),
    },
    {
      src: '/friends',
      icon: 'group-2',
      text: t('nav.friends'),
    },
    {
      src: '/robux',
      icon: 'robux',
      text: t('nav.robux'),
    },
    {
      src: '/cases',
      icon: 'case-1',
      text: t('nav.cases'),
    },
    {
      src: '/profile',
      icon: 'profile-1',
      text: t('nav.profile'),
    },
  ]
}
