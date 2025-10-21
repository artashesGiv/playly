import { useIsLoadingStore } from '@/store'

export const useKeyLoading = <T extends KeyLoading>(key: T): Ref<boolean> => {
  const { keysLoading } = storeToRefs(useIsLoadingStore())

  const isLoading = ref(false)

  watch(
    () => keysLoading.value.length,
    () => {
      isLoading.value = keysLoading.value.includes(key)
    },
  )

  return isLoading
}

export const useKeysLoading = <T extends KeyLoading>(
  keys: T[],
): Ref<boolean>[] => {
  return keys.map(item => useKeyLoading(item))
}
