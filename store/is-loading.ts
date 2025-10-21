export const useIsLoadingStore = defineStore('is-loading', () => {
  // state
  const isLoading = ref(0)

  const keysLoading = ref<KeyLoading[]>([])

  // actions
  const setIsLoading = (value: boolean) => {
    if (value) {
      isLoading.value++
    } else {
      isLoading.value--
    }
  }

  const addKeyLoading = (key: KeyLoading | KeyLoading[]) => {
    if (Array.isArray(key)) {
      keysLoading.value.push(...key)
    } else {
      keysLoading.value.push(key)
    }
  }

  const removeKeyLoading = (key: KeyLoading | KeyLoading[]) => {
    const keys = Array.isArray(key) ? key : [key]
    keysLoading.value = keysLoading.value.filter(item => !keys.includes(item))
  }

  return {
    isLoading,
    keysLoading,
    setIsLoading,
    removeKeyLoading,
    addKeyLoading,
  }
})
