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

    export namespace Rates {
      export type Response = Rates
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

    export namespace Refresh {
      export type Payload = Pick<TokenData, 'refresh_token'>
      export type Response = AuthResponse
    }

    export namespace Starpets {
      export type Params = {
        starpets_user_id: string
      }
      export type Response = undefined
    }

    export namespace CheckSubscription {
      export type Response = CheckSubscriptionData
    }

    export namespace SetLang {
      export type Payload = {
        lang_code: LanguageCode
      }
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
  first_enter: boolean
} & TokenData

export type UserInfo = {
  id: string
  telegram_id: number
  starpets_id: Maybe<number>
  email: string
  first_name: string
  last_name: string
  username: string
  photo_url: string
  crystal_balance: number
  robux_balance: number
  tasks: {
    starpets_join_channel?: boolean
    playly_join_channel: boolean
    starpets_light_join_channel?: boolean
  }
  starpets_info: {
    avatar: string
    id: string
    public_username: string
    username: string
  }
}

export type CheckSubscriptionData = {
  crystals_awarded: number
  channels_awarded: string[]
}

export type Rates = { robux2crystal: number; rub2robux: number }
