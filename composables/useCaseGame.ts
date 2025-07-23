import type { CaseItem } from '@/types'

export const useCaseGame = (item: CaseItem) => {
  const isCoinsItem = computed(() => item.crystal_instead_item)
  const isRobux = computed(() => item.game === 'robux')
  const isAdoptMe = computed(() => item.game === 'adopt_me')
  const isMM2 = computed(() => item.game === 'mm2')
  const isGrowagarden = computed(() => item.game === 'growagarden')

  return {
    isCoinsItem,
    isRobux,
    isAdoptMe,
    isMM2,
    isGrowagarden,
  }
}
