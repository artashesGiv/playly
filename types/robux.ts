import type { PaymentParams, PromocodeData } from '@/types'

export namespace Robux {
  export namespace GET {
    export namespace UserInfo {
      export type Response = RobloxUser[]
    }
    export namespace Place {
      export type Params = { user_id: RobloxUser['roblox_id'] }
      export type Response = RobloxPlace[]
    }
    export namespace Gamepass {
      export type Params = {
        robux_amount: number
        universe_id: RobloxPlace['universe_id']
      }
      export type Response = {
        gamepasses: Gamepass[]
        robux_amount_with_fee: number
      }
    }
    export namespace GamepassPrice {
      export type Params = {
        gamepass_id: Gamepass['id']
        universe_id: RobloxPlace['universe_id']
        robux_amount_with_fee: number
      }
      export type Response = undefined
    }
    export namespace CurrenWithdraw {
      export type Response = Withdraw
    }
    export namespace Transaction {
      export type Response = RobuxTransactions[]
    }
    export namespace Stock {
      export type Response = { stock_robux: number }
    }
  }
  export namespace POST {
    export namespace Withdraw {
      export type Payload = BuyRobuxData
      export type Response = {
        withdraw_id: string
        email: Maybe<string>
        amount_rub: number
      }
    }

    export namespace Promocode {
      export type Payload = { promocode: string }
      export type Response = PromocodeData
    }

    export namespace Sell {
      export type Params = { robux_amount: string }
    }

    export namespace Payment {
      export type Payload = PaymentParams
      export type Response = { uri: string }
    }
  }
}

export type RobloxUser = {
  roblox_id: number
  name: string
  avatar_url: string
}

export type RobloxPlace = {
  universe_id: number
  place_id: number
  name: string
  image_url: string
}

export type Withdraw = {
  roblox_username: string
  roblox_id: number
  universe_id: number
  gamepass: {
    id: number
    name: string
    price: number
    productId: number
    sellerId: number
    sellerName: string
    isOwned: boolean
  }
  robux_amount: number
}

export type Gamepass = {
  id: number
  isOwned: boolean
  name: string
  price: null
  image_url: string
  productId: null
  sellerId: null
  sellerName: string
}

export enum RobuxBuySteps {
  USER = 1,
  PLACE,
  GAMEPASS,
  GAMEPASS_PRICE,
  PAY,
  SUCCESS,
}

export type BuyRobuxData = {
  username: string
  roblox_id: number
  universe_id: number
  gamepass_id: number
  robux_amount_without_fee: number
  via_payment: boolean
}

export type TransactionType =
  | 'sell_robux'
  | 'from_case'
  | 'withdraw'
  | 'withdraw_failed'
  | 'rbxspace_withdraw_failed'

export type RobuxTransactions = { amount: -20; type: TransactionType }
