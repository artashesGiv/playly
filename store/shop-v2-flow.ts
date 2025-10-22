import type { RobloxUser, ShopV2, ShopV2Game, ShopV2Item } from '@/types'
import { LocalStorageKeys } from '@/types/enums'
import type { PayCard } from '@/components/pay-card.vue'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ShopV2FlowStep = 1 | 2 | 3 | 4

type MarketFlowData = {
  gameId?: ShopV2Game['id']
  game?: ShopV2Game
  itemId?: ShopV2Item['id']
  item?: ShopV2Item
  step: ShopV2FlowStep
  user?: RobloxUser
  users: RobloxUser[]
  activePayType?: Maybe<PayCard['type']>
  email: string
  withdrawId?: string
}

let timeout: Timeout

const getDefaultMarketFlowData = (): MarketFlowData => ({
  step: 1,
  users: [],
  email: '',
})

const defaultErrors = () => ({
  2: {
    input: false,
    select: false,
  },
  3: {
    input: false,
    select: false,
  },
})

export const useShopV2FlowStore = defineStore('shop-v2-flow', () => {
  const isOpenModal = ref(false)
  const isOpenOrder = ref(false)
  const marketFlowData = ref<MarketFlowData>(getDefaultMarketFlowData())
  const searchName = ref('')
  const errors = reactive(defaultErrors())
  const isOpenPaid = ref(false)

  const { tg, popup } = useTelegram()

  const currentStep = computed<ShopV2FlowStep>({
    get: () => marketFlowData.value.step,
    set: value => {
      marketFlowData.value.step = value
    },
  })

  const resetMarketFlowData = () => {
    marketFlowData.value = getDefaultMarketFlowData()
    searchName.value = ''
  }

  const getUsers = () => {
    clearTimeout(timeout)

    if (!searchName.value) {
      marketFlowData.value.users = []
    }
    if (searchName.value.length < 3) return

    timeout = setTimeout(async () => {
      await baseRequest({
        method: () => robuxAPI.fetchUserInfo(searchName.value.trim()),
        callback: result => {
          marketFlowData.value.users = result
          if (marketFlowData.value.users.length === 1) {
            marketFlowData.value.user = marketFlowData.value.users[0]
          }
        },
        keyLoading: 'fetch-roblox-user',
      })
    }, 500)
  }

  const buy = async (params: ShopV2.POST.Buy.Params) => {
    return await baseRequest({
      method: () => shopV2API.buy(params),
      keyLoading: 'buy-item',
    })
  }

  const payment = async (data: ShopV2.POST.Payment.Params) => {
    return await baseRequest({
      method: () => shopV2API.payment(data),
    })
  }

  const prevStep = () => {
    switch (currentStep.value) {
      case 1: {
        navigateTo('/shop-v2')
        break
      }
      case 2: {
        if (marketFlowData.value.itemId) {
          navigateTo(`/shop-v2/item/${marketFlowData.value.itemId}`)
        } else {
          navigateTo('/shop-v2')
        }
        currentStep.value -= 1
        break
      }
      case 3:
      case 4: {
        currentStep.value -= 1
        break
      }
      default: {
        break
      }
    }
  }
  const nextStep = async () => {
    switch (currentStep.value) {
      case 1: {
        currentStep.value += 1
        navigateTo('/shop-v2/flow', {
          replace: true,
        })
        break
      }
      case 2: {
        if (searchName.value.length < 3 && !marketFlowData.value.user) {
          errors[2].input = true
          return
        }

        if (!marketFlowData.value.user) {
          errors[2].select = true
          return
        }

        currentStep.value += 1
        break
      }
      case 3: {
        if (!emailRegex.test(marketFlowData.value.email)) {
          errors[3].input = true
          return
        }

        if (!marketFlowData.value.activePayType) {
          errors[3].select = true
        } else {
          currentStep.value += 1
        }
        break
      }
      case 4: {
        try {
          if (marketFlowData.value.item) {
            const { shop_withdraw_id } = await buy({
              shop_item_id: marketFlowData.value.itemId!,
              currency: marketFlowData.value.item?.currency,
              roblox_username: marketFlowData.value.user!.name,
              roblox_id: marketFlowData.value.user!.roblox_id,
            })

            marketFlowData.value.withdrawId = shop_withdraw_id

            const { uri } = await payment({
              email: marketFlowData.value.email,
              payment_method_id:
                paymentIdMap[marketFlowData.value.activePayType!]!,
              withdraw_id: shop_withdraw_id,
              withdraw_type: 'item',
            })

            tg.openLink(uri)

            isOpenPaid.value = true
          }
        } catch (error: any) {
          if (error.data.detail) {
            popup?.showAlert?.(error.data.detail)
          } else {
            popup?.showAlert?.(
              'Произошла ошибка при оплате, попробуйте еще раз',
            )
          }
        }
        break
      }
      default: {
        break
      }
    }
  }

  const commissionPercent = computed(() => {
    switch (marketFlowData.value.activePayType) {
      case 'SBP': {
        return 5
      }
      case 'cards': {
        return 6
      }

      default: {
        return 0
      }
    }
  })

  const getSummaryPrice = (item: ShopV2Item) => {
    return (item.price + item.price * (commissionPercent.value / 100)).toFixed(
      2,
    )
  }

  const getCurrentWithdraw = async () => {
    if (!marketFlowData.value.withdrawId) return

    return await baseRequest({
      method: () =>
        shopV2API.fetchWithdraw({
          withdraw_id: marketFlowData.value.withdrawId!,
        }),
    })
  }

  watch(searchName, () => {
    errors[2].select = false
    getUsers()
  })

  watch(
    marketFlowData,
    () => {
      localStorage.setItem(
        LocalStorageKeys.MARKET_STEPS_DATA,
        JSON.stringify(marketFlowData.value),
      )
    },
    { deep: true },
  )

  const data = localStorage.getItem(LocalStorageKeys.MARKET_STEPS_DATA)
  marketFlowData.value = data ? JSON.parse(data) : getDefaultMarketFlowData()

  return {
    marketFlowData,
    currentStep,
    isOpenModal,
    isOpenOrder,
    nextStep,
    prevStep,
    resetMarketFlowData,
    getUsers,
    searchName,
    errors,
    commissionPercent,
    getSummaryPrice,
    getCurrentWithdraw,
    isOpenPaid,
  }
})
