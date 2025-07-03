import type { Case, CaseItem } from '@/types'

export namespace Items {
  export namespace GET {
    export namespace Cases {
      export type Response = Case[]
    }
    export namespace Items {
      export type Params = { case_id: Case['id'] }
      export type Response = CaseItem[]
    }
  }
  export namespace POST {
    export namespace Open {
      export type Params = { case_id: Case['id'] }
      export type Response = CaseItem
    }
  }
}
