import type { Friend } from '@/types'

export const useFriendsStore = defineStore('friends', () => {
  const friends = ref<Friend[]>([
    {
      id: 1,
      name: 'Алексей',
      balance: 0,
      avatarUrl: '/images/template/user-avatar.png',
    },
    {
      id: 2,
      name: 'Мария',
      balance: 1,
      avatarUrl: '/images/template/user-avatar.png',
    },
    {
      id: 3,
      name: 'Иван',
      balance: 2,
      avatarUrl: '/images/template/user-avatar.png',
    },
    {
      id: 4,
      name: 'Ольга',
      balance: 5,
      avatarUrl: '/images/template/user-avatar.png',
    },
    {
      id: 5,
      name: 'Дмитрий',
      balance: 430,
      avatarUrl: '/images/template/user-avatar.png',
    },
  ])

  return { friends }
})
