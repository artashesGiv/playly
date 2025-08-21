<template>
  <div class="shop-pay">
    <ui-table-data :list="dataListOwn">
      <template #row-1>
        <user-data />
      </template>
    </ui-table-data>
    <ui-input-base
      v-model="email"
      v-model:is-error="errors.input"
      type="email"
      placeholder="Email"
    />
    <div class="shop-pay__list">
      <pay-card
        v-for="item in payCards"
        :key="item"
        :type="item"
        :is-active="item === activePayType"
        :is-error="errors.select"
        @click="onClick(item)"
      />
    </div>
    <ui-button-base
      :text="$t('common.buy')"
      :loading="isLoading"
      size="52"
      @click="onPay(params as ShopItem)"
    />
  </div>
</template>

<script setup lang="ts">
import { useShopStore } from '@/store'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import type { PayCard } from '@/components/pay-card.vue'
import type { ShopItem } from '@/types'

const { activePayType, email, errors, isLoading } =
  storeToRefs(useShopStore())
const { onPay } = useShopStore()

const { t } = useI18n()

const route = useRoute()
const params = JSON.parse(route.query.item as string) as Partial<ShopItem>

const currencyMap: Record<ShopItem['currency'], string> = {
  RUB: '₽',
  USD: '$',
}

const commissionPercent = computed(() => {
  switch (activePayType.value) {
    case 'SBP': {
      return 5
    }
    case 'cards': {
      return 6
    }

    default: {
      return 0
    }
  }
})

const payValueWithCommission = computed(() => {
  if (params.price) {
    return (
      +params.price +
      +params.price * (commissionPercent.value / 100)
    ).toFixed(2)
  }

  return 0
})

const dataListOwn = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: '',
  },
  {
    title: t('common.you_pay'),
    value: '',
  },
  {
    title: t('common.with_commission'),
    value: `${payValueWithCommission.value} ${currencyMap[params.currency!]}`,
  },
  {
    title: `${t('common.you_receive')}`,
    value: '',
  },
  {
    title: '',
    value: snakeToSentence(params.name || ''),
  },
])

const payCards: PayCard['type'][] = ['cards', 'SBP']

const onClick = (item: PayCard['type']) => {
  errors.value.select = false
  activePayType.value = item
}

useBackButton()
</script>

<style scoped lang="scss">
.shop-pay {
  @include column(18px);

  &__price {
    @include row(8px);
  }

  &__icon-robux {
    font-size: 22px;
    color: var(--yellow-500);
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
