type StepsData = {
  user: Maybe<number>
  place: Maybe<number>
  gamepass: Maybe<number>
}

const defaultStepsData = () => ({
  user: null,
  place: null,
  gamepass: null,
})

export const useRobuxBuyStore = defineStore('robux-buy', () => {
  const searchName = ref('')
  const step = ref(1)
  const stepsData = reactive<StepsData>(defaultStepsData())

  const resetStepsData = () => {
    step.value = 1
    searchName.value = ''
    Object.assign(stepsData, defaultStepsData())
  }

  const users = computed(() => {
    if (!searchName.value) return []

    return Array.from({ length: 16 }, (_, index) => ({
      id: index + 1,
      name: `${searchName.value}-${index + 1}`,
      src: '/images/template/user-avatar.png',
    }))
  })

  const places = ref([
    {
      id: 1,
      text: `item-1`,
      src: '/images/template/user-avatar.png',
    },
    {
      id: 2,
      text: `item-2`,
      src: '/images/template/user-avatar.png',
    },
    {
      id: 3,
      text: `item-3`,
      src: '/images/template/user-avatar.png',
    },
    {
      id: 4,
      text: `item-4`,
      src: '/images/template/user-avatar.png',
    },
  ])

  const gamepasses = ref<{ id: number; text: string; src: string }[]>([
    {
      id: 1,
      text: `item-1`,
      src: '/images/template/user-avatar.png',
    },
    {
      id: 2,
      text: `item-2`,
      src: '/images/template/user-avatar.png',
    },
    {
      id: 3,
      text: `item-3`,
      src: '/images/template/user-avatar.png',
    },
    {
      id: 4,
      text: `item-4`,
      src: '/images/template/user-avatar.png',
    },
  ])

  return {
    searchName,
    step,
    stepsData,
    places,
    users,
    gamepasses,
    resetStepsData,
  }
})
