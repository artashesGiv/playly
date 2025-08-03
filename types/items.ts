import type { Case, CaseItem, PersonalCaseItem } from '@/types'

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
