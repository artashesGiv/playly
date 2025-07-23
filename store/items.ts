import type { CaseItem, PersonalCaseItem } from '@/types'
import { useUserStore } from '@/store/user'

export const useItemsStore = defineStore('items', () => {
  const items = ref<PersonalCaseItem[]>([])
  const item = ref<Maybe<PersonalCaseItem>>(null)
  const { getUserInfo } = useUserStore()

  const ownList = computed(() =>
    items.value.filter(item => item.status === 'owned'),
  )

  const withdrawProcessList = computed(() =>
    items.value.filter(item => item.status === 'in_withdraw_progress'),
  )

  const withdrawSuccessList = computed(() =>
    items.value.filter(item => item.status === 'withdraw_success'),
  )

  const soldList = computed(() =>
    items.value.filter(item => item.status === 'sold_by_crystal'),
  )

  const getItems = async () => {
    await baseRequest({
      method: () => itemsAPI.fetchItems(),
      callback: async result => {
        items.value = result
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
      callback: async () => {
        await Promise.all([getUserInfo(), getItems()])
      },
    })
  }

  const sellItemRobux = async (robux_amount: number) => {
    await baseRequest({
      method: () => itemsAPI.sellItemRobux({ robux_amount }),
      callback: async () => {
        await Promise.all([getUserInfo(), getItems()])
      },
    })
  }

  const withdrawItem = async (id: CaseItem['id']) => {
    return await baseRequest({
      method: () => itemsAPI.withdrawItem({ user_item_id: id }),
      callback: async () => {
        await Promise.all([getUserInfo(), getItems()])
      },
    })
  }

  return {
    items,
    item,
    ownList,
    withdrawProcessList,
    withdrawSuccessList,
    soldList,
    withdrawItem,
    sellItem,
    getItems,
    getItem,
    sellItemRobux,
  }
})
