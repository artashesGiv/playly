<template>
  <div class="step-1">
    <div class="step-1__search">
      <ui-search-input
        v-model:search="itemsSearch"
        :placeholder="$t('market.items.search.placeholder')"
        auto-apply
      />
      <ui-button-base
        icon="filter-5"
        size="52"
        view="secondary"
        badge-view="primary"
        @click="navigateTo('/shop-v2/filters')"
      >
        <template v-if="filterLength" #badge>
          <div class="cart-button__badge">
            {{ countView(filterLength) }}
          </div>
        </template>
      </ui-button-base>
    </div>
    <!--    <ui-tabs v-model="currentItemsTab" :list="tabs" />-->
    <div class="step-1__content">
      <empty-search-block
        v-if="!loading && !items.length"
        @clear="resetFilters"
      />
      <div
        v-else-if="items.length"
        v-scroll-session
        class="step-1__list"
        @scroll-start="emit('inner-scroll-start')"
        @scroll-end="emit('inner-scroll-end')"
      >
        <template v-if="items.length">
          <shop-v2-item-card
            v-for="item in items"
            :key="item.id"
            v-bind="item"
            :name="shopItemNameMap[item.name] || item.name"
            @click="navigateTo(`/shop-v2/item/${item.id}`)"
          />
        </template>
      </div>
      <ui-spinner v-else size="xl" class="step-1__spinner" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopV2Store } from '@/store'
import { shopItemNameMap } from '../-helpers'

// stores
const { itemsSearch, items, itemsFiltersParams } = storeToRefs(useShopV2Store())
const { resetFilters } = useShopV2Store()

const filterLength = computed(() =>
  Object.values(itemsFiltersParams.value.filters).reduce((acc, item) => {
    return acc + item.length
  }, 0),
)

// data
const loading = useKeyLoading('get-market-items')

// const categoryList: ShopV2Item['category'][] = [
//   'growagarden',
//   'brawl_stars',
//   'pubg_mobile',
//   'fortnite',
//   'standoff2',
//   'clash_of_clans',
//   'call_of_duty',
//   'free_fire',
//   'mobile_legends',
//   'clash_royale',
//   'minecraft',
// ]
//
// const tabs: TabsProps<ShopV2Item['category'] | 'all'>['list'] = [
//   ...categoryList.map(item => ({
//     id: item,
//     text: snakeToSentence(item),
//   })),
// ]

const emit = defineEmits<{
  (e: 'inner-scroll-start' | 'inner-scroll-end'): void
}>()
</script>

<style scoped lang="scss">
.step-1 {
  @include column(14px);

  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  position: relative;

  &__search {
    @include row(12px);
  }

  &__content {
    position: relative;
    flex: 1 1 0;
    overflow: hidden;

    @include scroll-gradient;
    @include scroll-gradient-top;

    &::after,
    &::before {
      z-index: 10;
    }
  }

  &__list {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    height: 100%;
    overflow: auto;
  }

  &__spinner {
    @include center;
  }
}
</style>
