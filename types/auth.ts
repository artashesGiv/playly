import type { Friend } from '@/types/entities'

export namespace Auth {
  export namespace GET {
    export namespace UserInfo {
      export type Response = UserInfo
    }

    export namespace RefLink {
      export type Response = { ref_link: string }
    }

    export namespace Referrals {
      export type Response = Friend[]
    }
  }
  export namespace POST {
    export namespace Login {
      export type Payload = {
        init_data: string
        ref_code?: string
        timezone_offset_minutes: number
      }
      export type Response = AuthResponse
    }
  }
}

export type AuthResponse = {
  id: string
  telegram_id: number
  telegram_data: {
    first_name: string
    last_name: string
    username: string
    language_code: LanguageCode
    is_premium: Maybe<boolean>
    allows_write_to_pm: boolean
    photo_url: string
  }
} & TokenData

export type UserInfo = {
  id: string
  telegram_id: number
  starpets_id: Maybe<number>
  first_name: string
  last_name: string
  username: string
  photo_url: string
  crystal_balance: number
  robux_balance: number
  tasks: { starpets_join_channel: boolean; playly_join_channel: boolean }
}
