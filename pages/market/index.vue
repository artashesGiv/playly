<template>
  <div class="market">
    <market-access-write-banner v-if="!isWriteAccess" />
    <ui-input-base
      v-model="search"
      icon="search-3"
      :placeholder="$t('market.search.placeholder')"
    />
    <market-robux-banner />
    <ui-tabs v-model="currentTab" :list="tabs" no-scroll />
    <ui-divider />
    <div class="market__list">
      <market-item-card
        v-for="item in items"
        :key="item.id"
        v-bind="item"
        @click="onBuy(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMarketStore } from '@/store'
import type { MarketItem } from '@/types'
import type { TabsProps } from '@/components/ui/tabs.vue'

const { tg } = useTelegram()

const { search, items, currentTab } = storeToRefs(useMarketStore())
const { getItems } = useMarketStore()

const router = useRouter()
const { t } = useI18n()

const isWriteAccess = computed(() => tg.initDataUnsafe.user?.allows_write_to_pm)

const tabs: TabsProps<MarketItem['category'] | 'all'>['list'] = [
  {
    id: 'all',
    text: t('market.tabs.all'),
  },
  {
    id: 'gg_money',
    text: t('market.tabs.money'),
  },
  {
    id: 'growagarden',
    text: t('market.tabs.item'),
  },
]

const onBuy = (item: MarketItem) => {
  router.push({
    path: '/market/pay',
    query: {
      item: JSON.stringify(item),
    },
  })
}

onMounted(async () => {
  await getItems()
})
</script>

<style scoped lang="scss">
.market {
  @include column(16px);

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
}
</style>
