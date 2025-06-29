export const useRobuxBuyStore = defineStore('robux-buy', () => {
  const searchName = ref('')
  const step = ref(1)
  const activeUser = ref<Maybe<number>>(null)

  const users = computed(() => {
    if (!searchName.value) return []

    return Array.from({ length: 16 }, (_, index) => ({
      id: index + 1,
      name: `${searchName.value}-${index + 1}`,
      src: '/images/template/user-avatar.png',
    }))
  })

  return {
    searchName,
    step,
    activeUser,
    users,
  }
})
