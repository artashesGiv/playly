import type { Case, CaseCategory, CaseItem } from '@/types'

export namespace Cases {
  export namespace GET {
    export namespace Cases {
      export type Params = {
        category?: CaseCategory
      }
      export type Response = Case[]
    }
    export namespace Items {
      export type Params = { case_id: Case['id'] }
      export type Response = {
        list_items: CaseItem[]
        music_url: string
      }
    }
  }
  export namespace POST {
    export namespace Open {
      export type Params = {
        case_id: Case['id']
      }
      export type Response = CaseItem
    }
  }
}
