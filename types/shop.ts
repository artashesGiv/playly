import type { PaymentParams } from '@/types/payment'

export namespace Shop {
  export namespace GET {
    export namespace Items {
      export type Params = {
        category?: ShopItem['category']
        offset?: number
        limit?: number
        name_prefix?: string
      }
      export type Response = ShopItem[]
    }
  }

  export namespace POST {
    export namespace Buy {
      export type Params = {
        shop_item_id: string
        currency: string
      }
      export type Response = {
        shop_withdraw_id: string
      }
    }

    export namespace Payment {
      export type Params = PaymentParams
      export type Response = { uri: string }
    }
  }
}

export type ShopItemCategory =
  | 'growagarden'
  | 'brawl_stars'
  | 'pubg_mobile'
  | 'fortnite'
  | 'standoff2'
  | 'clash_of_clans'
  | 'call_of_duty'
  | 'free_fire'
  | 'mobile_legends'
  | 'clash_royale'
  | 'minecraft'

export type ShopItem = {
  id: string
  category: ShopItemCategory
  currency: 'RUB' | 'USD'
  image_url: string
  name: string
  price: number
  data: {
    item_type: string
    rarity: string
  }
}
