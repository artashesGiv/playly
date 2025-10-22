import type { ItemRarity } from '@/types/entities'
import type { PaymentParams } from '@/types/payment'

export namespace ShopV2 {
  export namespace GET {
    export namespace Games {
      export type Params = ShopV2GameParams
      export type Response = ShopV2Game[]
    }

    export namespace Withdraw {
      export type Params = { withdraw_id: string }
      export type Response = ShopV2Withdraw
    }

    export namespace Withdraws {
      export type Response = ShopV2Withdraw[]
    }
  }

  export namespace POST {
    export namespace Buy {
      export type Params = {
        shop_item_id: string
        roblox_username: string
        currency: string
        roblox_id: number
      }
      export type Response = {
        shop_withdraw_id: string
      }
    }

    export namespace Items {
      export type Params = ShopV2ItemsParams
      export type Response = {
        items: ShopV2Item[]
        min_price: number
        max_price: number
        filters: ShopV2Filters
      }
    }

    export namespace Payment {
      export type Params = PaymentParams
      export type Response = { uri: string }
    }
  }
}

export type ShopV2GameParams = { name_prefix?: string }

export type ShopV2Game = {
  id: string
  image_url: string
  name: string
  total_items: number
}

export type ShopV2ItemCategory = string

export type ShopV2Item = {
  id: string
  category: ShopV2ItemCategory
  currency: Currency
  image_url: string
  name: string
  price: number
  data: {
    item_type: string
    rarity: ItemRarity
  }
}

export type ShopV2ItemsParams = {
  category_id: ShopV2Game['id']
  name_prefix?: string
  to_price?: number
  from_price?: number
  filters: ShopV2Filters
}

export type ShopV2Filter = {
  name: string
  values: string[]
}

export type ShopV2Filters = ShopV2Filter[]
export type ShopV2Withdraw = {
  id: string
  user_id: string
  status:
    | 'payment_pending'
    | 'paid'
    | 'in_withdraw_progress'
    | 'withdraw_success'
    | 'withdraw_failed'
  category_status?: 'paid' | 'friend' | 'in_game' | 'success' | 'cancel'
  supplier_info?: {
    supplier_roblox_id: number
    supplier_roblox_url: string
    supplier_roblox_username: string
    supplier_roblox_avatar?: Maybe<string>
  }
  shop_item_currency: Currency
  shop_item_price: number
  shop_item_name: string
  shop_item_image_url: string
  shop_item_category: {
    category: ShopV2ItemCategory
    id: string
    image_url: string
  }
  roblox_username: string
  data?: ShopV2Item['data']
  roblox_account: {
    roblox_id: number
    roblox_username: string
    roblox_avatar: string
  }
}

export type ShopV2SummaryStatus =
  | 'paid'
  | 'order_created'
  | 'find_manager'
  | 'friend'
  | 'in_game'
  | 'success'
  | 'failed'

export type WithdrawSocketData = {
  cancel_reason: Maybe<string>
  status: string
  withdraw_id: string
}
