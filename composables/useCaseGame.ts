import type { CaseItem } from '@/types'

export const useCaseGame = (item: Ref<Maybe<CaseItem>>) => {
  const isCoinsItem = computed(() => item.value?.crystal_instead_item)
  const isRobux = computed(() => item.value?.game === 'robux')
  const isAdoptMe = computed(() => item.value?.game === 'adopt_me')
  const isMM2 = computed(() => item.value?.game === 'mm2')
  const isGrowagarden = computed(() => item.value?.game === 'growagarden')

  return {
    isCoinsItem,
    isRobux,
    isAdoptMe,
    isMM2,
    isGrowagarden,
  }
}
