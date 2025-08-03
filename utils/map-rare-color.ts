import type { ItemRarity } from '@/types'
import type { TagProps } from '@/components/ui/tag.vue'
import type { CaseCard } from '@/components/cases/card.vue'

export const mapRareColor: Record<ItemRarity, TagProps['color']> = {
  common: 'blue',
  uncommon: 'pink',
  rare: 'green',
  ultra_rare: 'red',
  legendary: 'yellow',
  godly: 'purple',
  vintage: 'marine',
  mythical: 'sky-blue',
}

export const tagColorMap: Record<CaseCard['category'], TagProps['color']> = {
  adopt_me: 'blue',
  robux: 'purple',
  mm2: 'pink',
  growagarden: 'marine',
}
