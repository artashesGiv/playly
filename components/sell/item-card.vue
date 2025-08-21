<template>
  <div class="sell-item" :class="`sell-item--direction--${direction}`">
    <div class="sell-item__image-wrapper">
      <nuxt-img :src="image_url" class="sell-item__image" />
    </div>
    <div class="sell-item__info">
      <span class="sell-item__name">{{ snakeToSentence(name) }}</span>
      <span class="sell-item__price">
        <ui-icon-base name="robux" class="sell-item__icon" />
        {{ price_robux }} R$
      </span>
    </div>
    <transition-fade>
      <ui-button-base
        v-if="!cart[id]"
        icon="plus"
        :text="$t('sell.item_card.button')"
        size="42"
        @click="addToCart(props)"
      />
      <sell-counter
        v-else
        :count="cart[id].count"
        :is-only-delete="isOnlyDelete"
        :disable="disable"
        class="sell-item__counter"
        @add="addToCart(props)"
        @remove="remove(props)"
      />
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import type { SellItem } from '@/types'
import { useSellStore } from '@/store'
import type { SellCounterProps } from '@/components/sell/counter.vue'

export type SellItemProps = SellItem & {
  direction?: 'vertical' | 'horizontal'
  isOnlyDelete?: boolean
  disable?: SellCounterProps['disable']
}

const props = withDefaults(defineProps<SellItemProps>(), {
  direction: 'vertical',
  disable: undefined,
})

const { cart } = storeToRefs(useSellStore())
const { addToCart, removeFromCart, removeAllItem } = useSellStore()

const remove = (item: SellItem) => {
  if (props.isOnlyDelete) {
    removeAllItem(item)
  } else {
    removeFromCart(item)
  }
}
</script>

<style scoped lang="scss">
.sell-item {
  $b: &;

  @include column(12px);

  background-color: var(--dark-900);
  padding: 12px;
  border-radius: 18px;

  &__image-wrapper {
    @include row;

    margin: 0 auto;
    justify-content: center;
    background-color: var(--dark-600);
    border-radius: 16px;
    max-width: 164px;
    width: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__image {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  &__info {
    @include column(4px);

    min-width: 75px;
  }

  &__price {
    @include row(4px);

    color: var(--white);
    font: var(--font-large-semibold);
  }

  &__name {
    @include ellipsis;

    font: var(--font-normal-medium);
  }

  &__icon {
    color: var(--yellow-500);
  }

  &--direction {
    &--horizontal {
      @include row(12px);

      #{$b}__image-wrapper {
        width: 70px;
        height: 70px;
        margin: 0;
      }

      #{$b}__image {
        width: 54px;
        height: 54px;
      }

      #{$b}__counter {
        margin-left: auto;
      }
    }
  }
}
</style>
