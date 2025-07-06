import type { Case, CaseItem } from '@/types'

export namespace Items {
  export namespace GET {
    export namespace Sell {
      export type Response = Case[]
    }
    export namespace CaseItems {
      export type Params = { case_id: Case['id'] }
      export type Response = CaseItem[]
    }
    export namespace Item {
      export type Params = { user_item_id: CaseItem['id'] }
      export type Response = CaseItem
    }
  }
  export namespace POST {
    export namespace Sell {
      export type Params = {
        user_item_id: string
        price: number
      }
    }
    export namespace Withdraw {
      export type Params = {
        user_item_id: string
      }
    }
  }
}
