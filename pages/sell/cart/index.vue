<template>
  <div class="sell-cart">
    <div class="sell-cart__header">
      <div class="sell-cart__header-text">
        <span class="title">{{ $t('sell.cart.title') }}</span>
        <span class="description">{{ $t('sell.cart.description') }}</span>
      </div>
      <ui-divider />
    </div>
    <div class="sell-cart__content">
      <div class="sell-cart__list">
        <sell-item-card
          v-for="item in Object.values(cart)"
          :key="item.id"
          v-bind="item"
          direction="horizontal"
        />
      </div>
      <span class="description">
        {{
          $t('sell.cart.alert', {
            min: MINIMUM_SUM_FOR_SELL,
            max: MAXIMUM_SUM_FOR_SELL,
          })
        }}
      </span>
    </div>
    <div class="sell-cart__footer">
      <ui-card class="minimal-sum sell-cart__minimal-sum">
        <div class="minimal-sum__header">
          <span class="minimal-sum__title">
            {{ $t('sell.cart.minimum_sum') }}
          </span>
          <span class="minimal-sum__count">
            <span
              class="minimal-sum__total"
              :class="{
                'minimal-sum__total--error': totalSum > MAXIMUM_SUM_FOR_SELL,
              }"
            >
              {{ totalSum }}
            </span>
            / {{ MINIMUM_SUM_FOR_SELL }} R$
          </span>
        </div>
        <ui-stauts-bar
          :max="MINIMUM_SUM_FOR_SELL"
          :progress="totalSum"
          :error-limit="MAXIMUM_SUM_FOR_SELL"
          is-show-success
          :next-step="0"
        />
      </ui-card>
      <ui-button-base
        :text="$t('sell.cart.continue')"
        size="52"
        :is-disabled="!isCanSell"
        @click="navigateTo('/sell/cart/step-1')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSellStore } from '@/store'

definePageMeta({
  layout: 'empty',
})

useBackButton()

const { cart, totalSum, totalItems } = storeToRefs(useSellStore())
const { MINIMUM_SUM_FOR_SELL, MAXIMUM_SUM_FOR_SELL } = useSellStore()

const isCanSell = computed(
  () =>
    totalSum.value >= MINIMUM_SUM_FOR_SELL &&
    totalSum.value <= MAXIMUM_SUM_FOR_SELL,
)

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
.sell-cart {
  @include column(18px);

  height: 100%;
  padding-top: 32px;

  .description {
    font: var(--font-base-medium);
  }

  &__header,
  &__content {
    @include column(18px);
  }

  &__header {
    &-text {
      @include column;

      text-align: center;
    }
  }

  &__content {
    flex: 1 1 auto;
  }

  &__list {
    @include column(12px);
  }

  &__footer {
    @include column(12px);

    padding-bottom: 16px;
  }

  &__minimal-sum {
    @include column(10px);
  }
}

.minimal-sum {
  &__header {
    @include row(12px);

    justify-content: space-between;
  }

  &__title {
    color: var(--white);
    font: var(--font-base-medium);
  }

  &__count {
    font: var(--font-base-medium);

    white-space: nowrap;
  }

  &__total {
    &--error {
      color: var(--red-500);
    }
  }
}
</style>
