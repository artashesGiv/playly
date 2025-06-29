import type { TagProps } from '@/components/ui/tag.vue'

export type Case = {
  id: string
  name: string
  image: string
  price: number
  tag: TagProps
}

export type CaseItemAbilities = 'mega-neon' | 'fly' | 'neon' | 'ride'

export type CaseItem = {
  id: string
  name: string
  image: string
  probability: number
  tag: TagProps
  abilities: CaseItemAbilities[]
}
