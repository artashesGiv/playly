export type PaymentParams = {
  payment_method_id: number
  email: string
  withdraw_id: string
  withdraw_type?: 'item' | 'robux'
}
