export const useNavigation = (): NavItem[] => {
  const { t } = useI18n()

  return [
    {
      src: '/',
      icon: 'mascot',
      text: t('nav.coins'),
    },
    {
      src: '/cases',
      icon: 'case-1',
      text: t('nav.cases'),
    },
    {
      src: '/robux',
      icon: 'robux',
      text: t('nav.robux'),
    },
    {
      src: '/friends',
      icon: 'group-2',
      text: t('nav.friends'),
    },
    {
      src: '/profile',
      icon: 'profile-1',
      text: t('nav.profile'),
    },
  ]
}
