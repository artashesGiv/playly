<template>
  <div class="sell">
    <ui-input-base
      v-model="search"
      icon="search-3"
      :placeholder="$t('sell.search.placeholder')"
    />
    <sell-banner @click-how-it-work="isOpenHowItWorkModal = true" />
    <ui-tabs v-model="currentTab" :list="tabs" :disabled-ids="tabDisabled" />
    <ui-divider />
    <div class="sell__list">
      <sell-item-card v-for="item in items" :key="item.id" v-bind="item" />
    </div>

    <sell-cart-button class="sell__cart-button" />

    <sell-onboarding-modal
      v-model:is-open="isOpenOnboardingModal"
      @open-how-it-work="isOpenHowItWorkModal = true"
    />
    <sell-how-to-work-modal v-model:is-open="isOpenHowItWorkModal" />
  </div>
</template>

<script setup lang="ts">
import { useSellStore } from '@/store'
import type { SellItem } from '@/types'
import type { TabsProps } from '@/components/ui/tabs.vue'

const FIRST_ENTRY_SELL_ITEMS_KEY = 'firstEntrySellItems'

const { t } = useI18n()
const { items, search, currentTab, currentTypeCart } =
  storeToRefs(useSellStore())
const { getItems } = useSellStore()

const isOpenOnboardingModal = ref(false)
const isOpenHowItWorkModal = ref(false)

type SellItemsTabs = TabsProps<SellItem['income_category']>

const tabDisabled = computed<SellItemsTabs['disabledIds']>(() => {
  if (currentTypeCart.value === 'cheap') {
    return ['expensive']
  }

  if (currentTypeCart.value === 'expensive') {
    return ['cheap']
  }

  return []
})

const tabs: SellItemsTabs['list'] = [
  {
    id: 'cheap',
    text: t(`sell.category.cheap`),
  },
  {
    id: 'expensive',
    text: t(`sell.category.expensive`),
  },
]

onMounted(async () => {
  await getItems()

  if (localStorage.getItem(FIRST_ENTRY_SELL_ITEMS_KEY) === null) {
    localStorage.setItem(FIRST_ENTRY_SELL_ITEMS_KEY, 'true')
    isOpenOnboardingModal.value = true
  }
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
    bottom: calc(#{var(--tg-safe-area-inset-bottom)} + 93px);
    right: 18px;
    width: max-content;
  }
}
</style>
