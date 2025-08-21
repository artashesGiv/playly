import type { Sell, SellItem } from '@/types'
import type { TabItem } from '@/components/ui/tabs.vue'

let timeout: Timeout

export const useSellStore = defineStore('sell', () => {
  const MINIMUM_SUM_FOR_SELL = 20
  const MAXIMUM_SUM_FOR_SELL = 1000

  const search = ref('')

  const items = ref<Maybe<SellItem[]>>(null)
  const isLoading = ref(false)

  const currentTab = ref<TabItem<SellItem['category']>['id']>('growagarden')

  const cart = ref<Record<SellItem['id'], SellItem & { count: number }>>({})

  const totalSum = computed(() => {
    return Object.values(cart.value).reduce((acc, item) => {
      return acc + item.price_robux * item.count
    }, 0)
  })

  const totalItems = computed(() => {
    return Object.values(cart.value).reduce((acc, item) => {
      return acc + item.count
    }, 0)
  })

  const getItems = async () => {
    await baseRequest({
      method: () =>
        sellAPI.getItems({
          category: currentTab.value,
          ...(search.value && {
            name_prefix: search.value,
          }),
        }),
      callback: data => {
        items.value = data
      },
    })
  }

  const sell = async () => {
    const params: Sell.POST.Buy.Params = {
      shop_items: Object.values(cart.value).map(item => ({
        shop_item_income_id: item.id,
        count: item.count,
      })),
    }

    return await baseRequest({
      method: () => sellAPI.sell(params),
    })
  }

  const addToCart = (item: SellItem) => {
    if (cart.value[item.id]) {
      cart.value[item.id].count++
    } else {
      cart.value[item.id] = { ...item, count: 1 }
    }
  }

  const removeFromCart = (item: SellItem) => {
    if (cart.value[item.id]?.count === 1) {
      const { [item.id]: _, ...rest } = cart.value
      cart.value = rest
    } else {
      cart.value[item.id].count--
    }
  }

  const removeAllItem = (item: SellItem) => {
    const { [item.id]: _, ...rest } = cart.value
    cart.value = rest
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
        currentTab.value = 'growagarden'
        await getItems()
      }, 500)
    },
  )

  return {
    MINIMUM_SUM_FOR_SELL,
    MAXIMUM_SUM_FOR_SELL,
    search,
    items,
    isLoading,
    currentTab,
    cart,
    totalSum,
    totalItems,
    getItems,
    sell,
    addToCart,
    removeFromCart,
    removeAllItem,
  }
})
