import { useAuthStore } from '@/store/auth'
import { clientsMap } from '@/assets/content'

export const useThemeStore = defineStore('theme', () => {
  const { client } = storeToRefs(useAuthStore())

  const primaryTheme = computed(() => clientsMap[client.value]?.primaryTheme)

  const applyPrimaryTheme = () => {
    const html = document.documentElement
    html.classList.add(`theme-${primaryTheme.value}`)
  }

  return {
    applyPrimaryTheme,
  }
})
