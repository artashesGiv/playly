import type { PayCard } from '@/components/pay-card.vue'
import type { Market, MarketItem } from '@/types'
import { paymentIdMap } from '@/utils/payment-id-map'
import type { TabItem } from '@/components/ui/tabs.vue'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
let timeout: Timeout

export const useMarketStore = defineStore('market', () => {
  const search = ref('')
  const activePayType = ref<Maybe<PayCard['type']>>(null)
  const email = ref('')
  const errors = reactive({
    input: false,
    select: false,
  })
  const items = ref<Maybe<MarketItem[]>>(null)
  const isLoading = ref(false)

  const currentTab = ref<TabItem<MarketItem['category']>['id'] | 'all'>('all')

  const { tg } = useTelegram()

  const getItems = async () => {
    await baseRequest({
      method: () =>
        marketAPI.getItems({
          ...(currentTab.value !== 'all' && {
            category: currentTab.value,
          }),
          ...(search.value && {
            name_prefix: search.value,
          }),
        }),
      callback: data => {
        items.value = data
      },
    })
  }

  const buy = async (params: Market.POST.Buy.Params) => {
    return await baseRequest({
      method: () => marketAPI.buy(params),
    })
  }

  const pay = async (params: Market.POST.Payment.Params) => {
    return await baseRequest({
      method: () => marketAPI.payment(params),
    })
  }

  const onPay = async (item: MarketItem) => {
    let isValid = true

    if (!emailRegex.test(email.value)) {
      errors.input = true
      isValid = false
    }

    if (!activePayType.value) {
      errors.select = true
      isValid = false
    }

    if (!isValid) return

    try {
      isLoading.value = true
      const { market_withdraw_id } = await buy({
        market_item_id: item.id,
        currency: item.currency,
      })

      const { uri } = await pay({
        email: email.value,
        payment_method_id: paymentIdMap[activePayType.value!]!,
        withdraw_id: market_withdraw_id,
        withdraw_type: item.category === 'robux' ? 'robux' : 'item',
      })

      tg.openLink(uri)
    } catch {
      // error
    } finally {
      isLoading.value = false
    }
  }

  watch(
    () => currentTab.value,
    async () => {
      await getItems()
    },
  )

  watch(
    () => search.value,
    () => {
      clearTimeout(timeout)

      timeout = setTimeout(async () => {
        await getItems()
      }, 500)
    },
  )

  return {
    search,
    activePayType,
    email,
    errors,
    items,
    isLoading,
    currentTab,
    onPay,
    getItems,
  }
})
