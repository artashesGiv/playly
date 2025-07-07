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
        universe_id: RobloxPlace['universe_id']
      }
      export type Response = {
        gamepasses: Gamepass[]
      }
    }
    export namespace CurrenWithdraw {
      export type Response = Withdraw
    }
    export namespace Withdraws {
      export type Response = Withdraw[]
    }
  }
  export namespace POST {
    export namespace Withdraw {
      export type Payload = BuyRobuxData
      export type Response = undefined
    }

    export namespace Sell {
      export type Params = { robux_amount: string }
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

export type RobuxBuySteps = 1 | 2 | 3 | 4 | 5 | 6

export type BuyRobuxData = {
  username: string
  roblox_id: number
  universe_id: number
  gamepass_id: number
  robux_amount_without_fee: number
}
