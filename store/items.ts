import type { CaseItem, PersonalCaseItem } from '@/types'
import { useUserStore } from '@/store/user'

export const useItemsStore = defineStore('items', () => {
  const items = ref<PersonalCaseItem[]>([])
  const itemNeedUpdate = ref(true)
  const item = ref<Maybe<PersonalCaseItem>>(null)
  const { getUserInfo } = useUserStore()

  const ownList = computed(() =>
    items.value.filter(item => item.status === 'owned'),
  )

  const withdrawProcessList = computed(() =>
    items.value.filter(
      item =>
        item.status === 'in_withdraw_progress' ||
        item.status === 'waiting_manager',
    ),
  )

  const withdrawSuccessList = computed(() =>
    items.value.filter(item => item.status === 'withdraw_success'),
  )

  const soldList = computed(() =>
    items.value.filter(item => item.status === 'sold_by_crystal'),
  )

  const getItems = async () => {
    if (itemNeedUpdate.value) {
      await baseRequest({
        method: () => itemsAPI.fetchItems(),
        callback: async result => {
          items.value = result
          itemNeedUpdate.value = false
        },
      })
    }
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
        await Promise.all([getUserInfo()])
        itemNeedUpdate.value = true
      },
    })
  }

  const sellItemRobux = async (robux_amount: number) => {
    await baseRequest({
      method: () => itemsAPI.sellItemRobux({ robux_amount }),
      callback: async () => {
        await Promise.all([getUserInfo()])
      },
    })
  }

  const withdrawItem = async (id: CaseItem['id']) => {
    return await baseRequest({
      method: () => itemsAPI.withdrawItem({ user_item_id: id }),
      callback: async () => {
        await Promise.all([getUserInfo()])
        itemNeedUpdate.value = true
      },
    })
  }

  const shareItem = async (id: CaseItem['id']) => {
    const data = await baseRequest({
      method: () => itemsAPI.shareItem({ user_item_id: id }),
    })

    return data.prepared_id
  }

  const getItemUser = async (id: CaseItem['id']) => {
    return await baseRequest({
      method: () => itemsAPI.fetchItemUser({ user_item_id: id }),
    })
  }

  const shareRobux = async () => {
    const data = await baseRequest({
      method: () => itemsAPI.shareRobux(),
    })

    return data.prepared_id
  }

  const getRobuxData = async (message_id: string) => {
    return await baseRequest({
      method: () => itemsAPI.fetchRobuxData({ message_id }),
    })
  }

  return {
    items,
    item,
    ownList,
    withdrawProcessList,
    withdrawSuccessList,
    soldList,
    itemNeedUpdate,
    withdrawItem,
    sellItem,
    getItems,
    getItem,
    sellItemRobux,
    shareItem,
    getItemUser,
    shareRobux,
    getRobuxData,
  }
})
