export namespace Sell {
  export namespace GET {
    export namespace Items {
      export type Params = {
        category?: SellItem['category']
        offset?: number
        limit?: number
        name_prefix?: string
      }
      export type Response = SellItem[]
    }
  }

  export namespace POST {
    export namespace Buy {
      export type Params = {
        shop_items: {
          shop_item_income_id: string
          count: number
        }[]
      }

      export type Response = {
        shop_deposit_id: string
      }
    }
  }
}

export type SellItemCategory = 'growagarden'

export type SellItem = {
  id: string
  category: SellItemCategory
  data: {
    item_type: string
    rarity: string
  }
  image_url: string
  name: string
  price_robux: number
}
