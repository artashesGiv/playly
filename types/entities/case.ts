export type CaseCategory = 'robux' | 'adopt_me' | 'growagarden' | 'mm2'
export type ItemRarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'ultra_rare'
  | 'legendary'
  | 'godly'
  | 'vintage'
  | 'mythical'

type BaseCaseItem = {
  id: string
  name: string
  image_url: string
  crystal_price: Maybe<number>
  crystal_instead_item?: boolean
  robux_amount?: number
}

type UserBaseCaseItem = {
  case_item_image_url: string
  crystal_price: number
  game: CaseCategory
  telegram_photo_url: string
  telegram_username: string
  item_name: string
}

export type Case = {
  id: string
  image_url: string
  name: string
  price: number
  category: CaseCategory
}

export type CaseItemAbilities = 'mega-neon' | 'flyable' | 'neon' | 'rideable'

export type AdoptMe = {
  item_type: string
  flyable: false
  rideable: false
  pumping: string
  age?: string
  rarity: ItemRarity
}

export type MM2 = {
  chroma: boolean
  item_sub_type: string
  item_type: string
  rarity: ItemRarity
}

export type Growagarden = {
  chroma: boolean
  item_type: string
  rarity: ItemRarity
}

export type CaseItem =
  | (BaseCaseItem & { game: 'adopt_me'; data: AdoptMe })
  | (BaseCaseItem & { game: 'mm2'; data: MM2 })
  | (BaseCaseItem & { game: 'growagarden'; data: Growagarden })
  | (BaseCaseItem & { game: 'robux'; data: object })

export type UserCaseItem =
  | (UserBaseCaseItem & { game: 'adopt_me'; data: AdoptMe })
  | (UserBaseCaseItem & { game: 'mm2'; data: MM2 })
  | (UserBaseCaseItem & { game: 'growagarden'; data: Growagarden })

export type PersonalCaseItemData = {
  crystal_sell_timer: string
  starpets_withdraw_timer: Maybe<string>
  status:
    | 'owned'
    | 'sold_by_crystal'
    | 'in_withdraw_progress'
    | 'waiting_manager'
    | 'withdraw_error'
    | 'withdraw_success'
}

export type PersonalCaseItem = CaseItem & PersonalCaseItemData
