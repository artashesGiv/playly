import type { CaseItem } from '@/types'
import type { TagProps } from '@/components/ui/tag.vue'

export const mapRareColor: Record<CaseItem['rarity'], TagProps['view']> = {
  common: 'blue',
  uncommon: 'pink',
  rare: 'green',
  ultra_rare: 'red',
  legendary: 'yellow',
}
