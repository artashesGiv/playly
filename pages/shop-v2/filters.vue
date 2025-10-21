<template>
  <div class="filters">
    <back-header :title="$t('market.filters.title')" class="filters__header" />
    <div class="filters__content">
      <div class="filters__section">
        <div>
          <ui-title :text="$t('market.filters.price')" />
          <ui-divider />
        </div>

        <div class="filters__inputs">
          <ui-input-base
            v-model="itemsFiltersParams.price.min_price"
            v-model:is-error="filtersPriceErrors.from"
            :placeholder="pricePlaceholders.from"
            type="number"
            :min="itemsFilters.price.min_price || 0"
            :max="itemsFilters.price.max_price || 0"
          />
          <ui-input-base
            v-model="itemsFiltersParams.price.max_price"
            v-model:is-error="filtersPriceErrors.to"
            :placeholder="pricePlaceholders.to"
            type="number"
            :min="itemsFilters.price.min_price || 0"
            :max="itemsFilters.price.max_price || 0"
          />
        </div>
      </div>
      <div
        v-for="(filter, key) in itemsFilters.filters"
        :key="key"
        class="filters__section"
      >
        <div>
          <ui-title
            :text="snakeToSentence(key)"
            :count="itemsFiltersParams.filters[key]?.length || undefined"
          />
          <ui-divider />
        </div>

        <ui-chips
          :model-value="itemsFiltersParams.filters[key] || []"
          :list="filter"
          @update:model-value="itemsFiltersParams.filters[key] = $event"
        />
      </div>
    </div>
    <div class="filters__footer">
      <ui-button-base
        :text="
          items.length
            ? $t('market.filters.buttons.complete', { n: items.length })
            : $t('market.filters.buttons.not_find')
        "
        :is-disabled="!items.length"
        size="52"
        :loading="loading"
        @click="navigateTo(`/shop-v2/game/${marketFlowData.gameId}`)"
      />
      <ui-button-base
        :text="$t('market.filters.buttons.clear')"
        view="secondary"
        size="52"
        @click="resetFilters"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopV2FlowStore, useShopV2Store } from '@/store'

// define
definePageMeta({
  layout: 'empty',
})

// data
const { t } = useI18n()
const loading = useKeyLoading('get-market-items')

// stores
const { itemsFilters, itemsFiltersParams, filtersPriceErrors, items } =
  storeToRefs(useShopV2Store())
const { marketFlowData } = storeToRefs(useShopV2FlowStore())
const { resetFilters, getItems } = useShopV2Store()

// computed
const pricePlaceholders = computed(() => ({
  from: `${t('market.filters.from')} ${itemsFilters.value.price.min_price}₽`,
  to: `${t('market.filters.to')} ${itemsFilters.value.price.max_price}₽`,
}))

// hooks
useBackButton()

onMounted(async () => {
  if (marketFlowData.value.gameId) {
    await getItems(marketFlowData.value.gameId)
  } else {
    navigateTo('/shop-v2')
  }
})
</script>

<style scoped lang="scss">
.filters {
  @include column(16px);

  padding-top: 16px;
  height: 100%;

  &__content,
  &__section {
    @include column(14px);
  }

  &__content {
    flex: 1 1 0;
    overflow: auto;
  }

  &__inputs {
    @include row(10px);
  }

  &__footer {
    @include column(12px);

    flex-shrink: 0;
    padding-bottom: 16px;
  }
}
</style>
