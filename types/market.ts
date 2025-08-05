import type { PaymentParams } from '@/types/payment'

export namespace Market {
  export namespace GET {
    export namespace Items {
      export type Params = {
        category?: MarketItem['category']
        offset?: number
        limit?: number
        name_prefix?: string
      }
      export type Response = MarketItem[]
    }
  }

  export namespace POST {
    export namespace Buy {
      export type Params = {
        market_item_id: string
        currency: string
      }
      export type Response = {
        market_withdraw_id: string
      }
    }

    export namespace Payment {
      export type Params = PaymentParams
      export type Response = { uri: string }
    }
  }
}

export type MarketItem = {
  id: string
  category: 'growagarden' | 'gg_money'
  currency: 'RUB' | 'USD'
  image_url: string
  name: string
  price: number
  data: {
    item_type: string
    rarity: string
  }
}
