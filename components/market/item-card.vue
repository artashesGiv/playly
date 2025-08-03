<template>
  <div class="market-item">
    <div class="market-item__image-wrapper">
      <nuxt-img :src="image_url" class="market-item__image" />
    </div>
    <div class="market-item__info">
      <span class="market-item__price">{{ price }} ₽</span>
      <span class="market-item__name">{{ snakeToSentence(name) }}</span>
    </div>
    <ui-button-base
      icon="buy-3"
      :text="$t('market.buy.button')"
      size="42"
      @click="emit('click')"
    />
  </div>
</template>

<script setup lang="ts">
import type { MarketItem } from '@/types'

export type MarketItemProps = MarketItem
type Emit = {
  (e: 'click'): void
}

defineProps<MarketItemProps>()
const emit = defineEmits<Emit>()
</script>

<style scoped lang="scss">
.market-item {
  @include column(16px);

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
  }

  &__image {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  &__info {
    @include column(4px);
  }

  &__price {
    color: var(--white);
    font: var(--font-large-semibold);
  }

  &__name {
    font: var(--font-normal-medium);
  }
}
</style>
