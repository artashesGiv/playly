export type Case = {
  id: string
  image_url: string
  name: string
  price: number
  category: 'robux' | 'adopt_me'
}

export type CaseItemAbilities = 'mega-neon' | 'flyable' | 'neon' | 'rideable'

export type CaseItem = {
  crystal_price: number
  id: string
  image_url: string
  item_type: string
  name: string
  probability: number
  rarity: 'common' | 'uncommon' | 'rare' | 'ultra_rare' | 'legendary'
  flyable: Maybe<boolean>
  pumping: Maybe<boolean>
  rideable: Maybe<boolean>
  age: string
  starpets_withdraw_progress: false
  crystal_sell_timer: string
  starpets_withdraw_timer: Maybe<string>
  robux_amount?: number
  status:
    | 'owned'
    | 'sold_by_crystal'
    | 'in_withdraw_progress'
    | 'withdraw_error'
    | 'withdraw_success'
}
