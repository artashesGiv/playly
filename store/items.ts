import type { CaseItem } from '@/types'
import { useUserStore } from '@/store/user'

export const useItemsStore = defineStore('items', () => {
  const items = ref<CaseItem[]>([])
  const item = ref<Maybe<CaseItem>>(null)
  const { getUserInfo } = useUserStore()

  const { tg } = useTelegram()

  const ownList = computed(() =>
    items.value.filter(
      item =>
        item.status !== 'withdraw_success' && item.status !== 'sold_by_crystal',
    ),
  )

  const receivedList = computed(() =>
    items.value.filter(item => item.status === 'withdraw_success'),
  )

  const getItems = async () => {
    await baseRequest({
      method: () => itemsAPI.fetchItems(),
      callback: async result => {
        items.value = result
        await getUserInfo()
      },
    })
  }

  const getItem = async (id: CaseItem['id']) => {
    await baseRequest({
      method: () => itemsAPI.fetchItem({ user_item_id: id }),
      callback: async result => {
        item.value = result
        await getUserInfo()
      },
    })
  }

  const sellItem = async (id: CaseItem['id'], price: number) => {
    await baseRequest({
      method: () => itemsAPI.sellItem({ user_item_id: id, price }),
      callback: () => {
        tg?.showAlert('Предмет успешно продан')
      },
    })
  }

  const sellItemRobux = async (id: CaseItem['id']) => {
    await baseRequest({
      method: () => itemsAPI.sellItemRobux({ user_item_robux_id: id }),
      callback: () => {
        tg?.showAlert('Предмет успешно продан')
      },
    })
  }

  const withdrawItem = async (id: CaseItem['id']) => {
    await baseRequest({
      method: () => itemsAPI.withdrawItem({ user_item_id: id }),
    })
  }

  return {
    items,
    item,
    ownList,
    receivedList,
    withdrawItem,
    sellItem,
    getItems,
    getItem,
    sellItemRobux,
  }
})
