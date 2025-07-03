export type Case = {
  id: string
  image_url: string
  name: string
  price: number
}

export type CaseItemAbilities = 'mega-neon' | 'flyable' | 'neon' | 'rideable'

export type CaseItem = {
  crystal_price: number
  id: string
  image_url: string
  item_type: string
  name: string
  probability: number
  rarity: string
  flyable: Maybe<boolean>
  pumping: Maybe<boolean>
  rideable: Maybe<boolean>
}
