<template>
  <div class="sell-cart-step-1">
    <main-header class="sell-cart-step-1__header" />
    <div class="sell-cart-step-1__content">
      <ui-table-data :list="dataList">
        <template #row-1>
          <user-data />
        </template>
        <template #row-3="{ value }">
          <div class="sell-cart-step-1__price">
            <span>{{ value }}</span>
            <ui-icon-base name="robux" />
          </div>
        </template>
      </ui-table-data>
      <span class="sell-cart-step-1__text">
        {{ $t('sell.cart.step-1.will_be_sold') }}
      </span>
      <div class="sell-cart-step-1__list">
        <sell-item-card
          v-for="item in Object.values(cart)"
          :key="item.id"
          v-bind="item"
          :disable="getIsAddItemDisabled(item)"
          direction="horizontal"
        />
      </div>
      <span class="sell-cart-step-1__text">
        {{ $t('sell.cart.step-1.alert') }}
      </span>
    </div>
    <div class="sell-cart-step-1__footer">
      <ui-button-base
        :text="$t('sell.cart.step-1.continue', totalSum)"
        :loading="isLoading"
        icon="robux"
        size="52"
        @click="onSell"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSellStore } from '@/store'
import type { SellItem } from '@/types'
import UserData from '@/components/user-data.vue'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import type { SellItemProps } from '@/components/sell/item-card.vue'

definePageMeta({
  layout: 'empty',
})

useBackButton()

const isLoading = ref(false)

const { t } = useI18n()
const { user, popup } = useTelegram()

const { cart, totalSum, totalItems } = storeToRefs(useSellStore())
const { sell, MAXIMUM_SUM_FOR_SELL } = useSellStore()

const dataList = computed<TableDataProps['list']>(() => [
  {
    title: t('sell.cart.step-1.seller'),
    value: user,
  },
  {
    title: t('sell.cart.step-1.will_be_sold'),
    value: t('common.items', totalItems.value),
  },
  {
    title: t('sell.cart.step-1.will_get'),
    value: `${totalSum.value} R$`,
  },
])

const onSell = async () => {
  try {
    isLoading.value = true
    await sell()
    navigateTo('/sell/cart/step-2')
  } catch (e) {
    console.log(e)
    popup.showAlert('Что то пошло не так...')
  } finally {
    isLoading.value = false
  }
}

const getIsAddItemDisabled = (item: SellItem): SellItemProps['disable'] => {
  const nextTotalSum = totalSum.value + item.price_robux

  if (nextTotalSum >= MAXIMUM_SUM_FOR_SELL) {
    return ['add']
  }
}

watch(
  totalItems,
  () => {
    if (totalItems.value === 0) {
      navigateTo('/sell')
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.sell-cart-step-1 {
  @include column(18px);

  height: 100%;

  &__content {
    @include column(14px);
  }

  &__content {
    flex: 1 1 auto;
  }

  &__price {
    @include row(8px);

    i {
      color: var(--yellow-500);
    }
  }

  &__list {
    @include column(12px);
  }

  &__footer {
    @include column(12px);

    padding-bottom: 16px;
  }

  &__text {
    font: var(--font-small-medium);
  }
}
</style>
