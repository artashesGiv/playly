import type { PayCard } from '@/components/pay-card.vue'
import type { Shop, ShopItem } from '@/types'
import { paymentIdMap } from '@/utils/payment-id-map'
import type { TabItem } from '@/components/ui/tabs.vue'
import { useItemsStore } from '@/store/items'
import { useUserStore } from '@/store/user'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
let timeout: Timeout

export const useShopStore = defineStore('shop', () => {
  const search = ref('')
  const activePayType = ref<Maybe<PayCard['type']>>(null)
  const email = ref('')
  const errors = reactive({
    input: false,
    select: false,
  })
  const items = ref<Maybe<ShopItem[]>>(null)
  const isLoading = ref(false)

  const currentTab = ref<TabItem<ShopItem['category']>['id']>('growagarden')

  const { itemNeedUpdate } = storeToRefs(useItemsStore())
  const { userInfo } = storeToRefs(useUserStore())

  const { tg } = useTelegram()

  const getItems = async () => {
    await baseRequest({
      method: () =>
        shopAPI.getItems({
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

  const buy = async (params: Shop.POST.Buy.Params) => {
    return await baseRequest({
      method: () => shopAPI.buy(params),
    })
  }

  const pay = async (params: Shop.POST.Payment.Params) => {
    return await baseRequest({
      method: () => shopAPI.payment(params),
    })
  }

  const onPay = async (item: ShopItem) => {
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
      const { shop_withdraw_id } = await buy({
        shop_item_id: item.id,
        currency: item.currency,
      })

      const { uri } = await pay({
        email: email.value,
        payment_method_id: paymentIdMap[activePayType.value!]!,
        withdraw_id: shop_withdraw_id,
        withdraw_type: 'item',
      })

      tg.openLink(uri)
      itemNeedUpdate.value = true
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
        currentTab.value = 'growagarden'
        await getItems()
      }, 500)
    },
  )

  onMounted(() => {
    email.value = userInfo.value?.email || ''
  })

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
