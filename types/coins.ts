export namespace Coins {
  export namespace GET {
    export namespace TaskSettings {
      export type Response = TaskSettings
    }
  }
  export namespace POST {
    export namespace Tap {
      export type Payload = { tap_amount: number }
      export type Response = { message: string }
    }
  }
}

export type TaskSettings = {
  ref_crystal_amount: number
  channel_join_crystal_amount: number
}
