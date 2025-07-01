export namespace Auth {
  export namespace POST {
    export namespace Login {
      export type Payload = {
        init_data: string
        ref_code?: string
        timezone_offset_minutes: number
      }
      export type Response = TokenData
    }
  }
}
