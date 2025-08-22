<template>
  <div class="sell">
    <ui-input-base
      v-model="search"
      icon="search-3"
      :placeholder="$t('sell.search.placeholder')"
    />
    <sell-banner />
    <ui-tabs v-model="currentTab" :list="tabs" />
    <ui-divider />
    <div class="sell__list">
      <sell-item-card v-for="item in items" :key="item.id" v-bind="item" />
    </div>

    <sell-cart-button class="sell__cart-button" />
  </div>
</template>

<script setup lang="ts">
import { useSellStore } from '@/store'
import type { SellItem } from '@/types'
import type { TabsProps } from '@/components/ui/tabs.vue'

const { t } = useI18n()
const { items, search, currentTab } = storeToRefs(useSellStore())
const { getItems } = useSellStore()

const tabs: TabsProps<SellItem['income_category']>['list'] = [
  {
    id: 'cheap',
    text: t('sell.category.cheap'),
  },
  {
    id: 'expensive',
    text: t('sell.category.expensive'),
  },
]

onMounted(async () => {
  await getItems()
})
</script>

<style scoped lang="scss">
.sell {
  @include column(16px);

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  &__cart-button {
    position: absolute;
    bottom: 93px;
    right: 18px;
    width: max-content;
  }
}
</style>
