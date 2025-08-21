import type { Case, CaseItem, PersonalCaseItem, UserCaseItem } from '@/types'

export namespace Items {
  export namespace GET {
    export namespace Sell {
      export type Response = Case[]
    }
    export namespace CaseItems {
      export type Params = { case_id: Case['id'] }
      export type Response = PersonalCaseItem[]
    }
    export namespace Item {
      export type Params = { user_item_id: CaseItem['id'] }
      export type Response = PersonalCaseItem
    }
    export namespace UserItem {
      export type Params = { user_item_id: CaseItem['id'] }
      export type Response = UserCaseItem
    }
    export namespace Share {
      export type Params = {
        user_item_id: CaseItem['id']
      }
      export type Response = {
        prepared_id: string
      }
    }
    export namespace UserRobux {
      export type Params = {
        message_id: string
      }
      export type Response = UserRobuxData
    }
  }
  export namespace POST {
    export namespace Sell {
      export type Params = {
        user_item_id: string
        price: number
      }
    }
    export namespace SellRobux {
      export type Params = {
        robux_amount: number
      }
    }
    export namespace Withdraw {
      export type Params = {
        user_item_id: string
      }
      export type Response = {
        manager_withdraw_url?: string
      }
    }
  }
}

export type UserRobuxData = {
  telegram_username: string
  telegram_photo_url: string
  robux_amount: number
}
