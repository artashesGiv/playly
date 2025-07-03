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
      export type Response = Gamepass[]
    }
    export namespace CurrenWithdraw {
      export type Response = Withdraw
    }
    export namespace Withdraws {
      export type Response = Withdraw[]
    }
  }
  export namespace POST {
    export namespace UserInfo {
      export type Payload = {
        username: RobloxUser['name']
        roblox_id: RobloxUser['roblox_id']
      }
      export type Response = { withdraw_id: WithdrawId }
    }
    export namespace Place {
      export type Payload = {
        withdraw_id: string
        roblox_user_id: RobloxUser['roblox_id']
        universe_id: RobloxPlace['universe_id']
        place_id: RobloxPlace['place_id']
      }
      export type Response = undefined
    }
    export namespace Gamepass {
      export type Payload = {
        withdraw_id: string
        gamepass_id: number
        robux_amount_with_fee: number
        robux_amount_without_fee: number
      }
      export type Response = undefined
    }
    export namespace Withdraw {
      export type Payload = { withdraw_id: WithdrawId }
      export type Response = undefined
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
  withdraw_id: string
  gamepass_id: number
  robux_amount_with_fee: number
  robux_amount_without_fee: number
}

export type WithdrawId = string

export type RobuxBuySteps = 1 | 2 | 3 | 4 | 5
