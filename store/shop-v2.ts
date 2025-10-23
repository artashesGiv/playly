import type {
  Option,
  ShopV2Filters,
  ShopV2Game,
  ShopV2GameParams,
  ShopV2Item,
  ShopV2ItemsParams,
  ShopV2Withdraw,
} from '@/types'
import { toPool } from '@/utils/to-pool'
import { watchDebounced } from '@vueuse/core'
import type { TabItem } from '@/components/ui/tabs.vue'
import { useShopV2FlowStore } from '@/store/shop-v2-flow'

type LocalItemsFilterData = {
  filters: Record<string, Option[]>
  price: {
    min_price: Maybe<number>
    max_price: Maybe<number>
  }
}

type LocalItemsFilterParams = {
  filters: Record<string, string[]>
  price: {
    min_price: Maybe<number>
    max_price: Maybe<number>
  }
}

export const useShopV2Store = defineStore('shop-v2', () => {
  // COMMON
  const { marketFlowData } = storeToRefs(useShopV2FlowStore())
  const allWithdraws = ref<ShopV2Withdraw[]>([])

  const allWithdrawsPool = computed(() => toPool(allWithdraws.value))

  const updateWithdraw = (
    id: ShopV2Withdraw['id'],
    patch: Partial<ShopV2Withdraw>,
  ) => {
    const index = allWithdraws.value.findIndex(withdraw => withdraw.id === id)
    if (index !== -1) {
      const current = allWithdraws.value[index]
      allWithdraws.value[index] = {
        ...current,
        ...patch,
        id: current.id,
      }
    }
  }

  const getWithdraws = async () => {
    await baseRequest({
      method: () => shopV2API.fetchWithdraws(),
      callback: data => {
        allWithdraws.value = data
      },
      keyLoading: 'get-market-orders',
    })
  }
  const isVisitOrders = ref(false)

  // GAMES
  const games = ref<ShopV2Game[]>([])

  const gamesSearch = ref('')
  const gamesPool = computed(() => toPool(games.value))

  const gamesParams = computed<ShopV2GameParams>(() => ({
    ...(gamesSearch.value && { name_prefix: gamesSearch.value }),
  }))

  const clearGamesParams = () => {
    gamesSearch.value = ''
  }

  const getGames = async () => {
    await baseRequest({
      method: () => shopV2API.getGames(gamesParams.value),
      callback: data => {
        games.value = data
      },
      keyLoading: 'get-market-games',
    })
  }

  watchDebounced(
    gamesParams,
    async () => {
      await getGames()
    },
    { debounce: 1000, maxWait: 1000, deep: true },
  )

  // ITEMS
  const items = ref<ShopV2Item[]>([])
  const itemsSearch = ref('')
  const itemsPool = computed(() => toPool(items.value))

  const getDefaultFilters = () => ({
    price: {
      min_price: null,
      max_price: null,
    },
    filters: {},
  })

  const itemsFilters = ref<LocalItemsFilterData>(getDefaultFilters())
  const itemsFiltersParams = ref<LocalItemsFilterParams>(getDefaultFilters())

  const currentItemsTab =
    ref<TabItem<ShopV2Item['category']>['id']>('growagarden')

  const filtersPriceErrors = ref({
    from: false,
    to: false,
  })
  const itemsParams = computed<Omit<ShopV2ItemsParams, 'category_id'>>(() => ({
    ...(itemsSearch.value && { name_prefix: itemsSearch.value.toLowerCase() }),
    filters: localFiltersToFilters(itemsFiltersParams.value.filters),
    ...(itemsFiltersParams.value.price.min_price && {
      from_price: itemsFiltersParams.value.price.min_price,
    }),
    ...(itemsFiltersParams.value.price.max_price && {
      to_price: itemsFiltersParams.value.price.max_price,
    }),
    category_id: currentItemsTab.value,
  }))

  const resetFilters = () => {
    itemsSearch.value = ''
    itemsFiltersParams.value = getDefaultFilters()
  }

  const clearItemsParams = () => {
    itemsFilters.value = getDefaultFilters()

    resetFilters()
  }

  const getItems = async (gameId: ShopV2Game['id']) => {
    await baseRequest({
      method: () =>
        shopV2API.getItems({ ...itemsParams.value, category_id: gameId }),
      callback: ({ items: itemsList, filters, max_price, min_price }) => {
        items.value = itemsList
        itemsFilters.value.filters = filtersToLocalFilters(filters)
        itemsFilters.value.price = {
          min_price,
          max_price,
        }
      },
      keyLoading: 'get-market-items',
    })
  }

  const clearItems = () => {
    items.value = []
    clearItemsParams()
  }

  watchDebounced(
    itemsParams,
    async () => {
      if (filtersPriceErrors.value.from || filtersPriceErrors.value.to) {
        return
      }

      console.log('GAME', marketFlowData.value)

      if (marketFlowData.value.gameId) {
        await getItems(marketFlowData.value.gameId)
      }
    },
    { debounce: 1000, maxWait: 1000, deep: true },
  )

  return {
    gamesSearch,
    games,
    getGames,
    clearGamesParams,
    gamesPool,
    itemsPool,
    currentItemsTab,
    clearItemsParams,
    getItems,
    items,
    itemsSearch,
    itemsFilters,
    itemsFiltersParams,
    filtersPriceErrors,
    clearItems,
    resetFilters,
    getWithdraws,
    allWithdraws,
    allWithdrawsPool,
    isVisitOrders,
    updateWithdraw,
  }
})

function filtersToLocalFilters(
  filters: ShopV2Filters,
): LocalItemsFilterData['filters'] {
  return filters.reduce((acc, item) => {
    return {
      ...acc,
      [item.name]: item.values.map(value => ({
        id: value,
        text: snakeToSentence(value),
      })),
    }
  }, {})
}

function localFiltersToFilters(
  local: LocalItemsFilterParams['filters'],
): ShopV2Filters {
  return Object.entries(local).flatMap(([name, valuesList]) => {
    const values = Array.from(new Set(valuesList || []))
    if (!values.length) return []
    return [{ name, values }]
  })
}
