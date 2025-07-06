import type { CaseItem } from '@/types'

export const useItemsStore = defineStore('items', () => {
  const items = ref<CaseItem[]>([])

  const { tg } = useTelegram()

  const ownList = computed(() =>
    items.value.filter(item => item.status === 'owned'),
  )

  const receivedList = computed(() =>
    items.value.filter(item => item.status !== 'owned'),
  )

  const getItems = async () => {
    await baseRequest({
      method: () => itemsAPI.fetchItems(),
      callback: result => {
        items.value = result
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

  const withdrawItem = async (id: CaseItem['id']) => {
    await baseRequest({
      method: () => itemsAPI.withdrawItem({ user_item_id: id }),
    })
  }

  return {
    items,
    ownList,
    receivedList,
    withdrawItem,
    sellItem,
    getItems,
  }
})
