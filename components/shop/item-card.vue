<template>
  <div class="shop-item">
    <div class="shop-item__image-wrapper">
      <nuxt-img
        :src="image_url"
        class="shop-item__image"
        :class="{ 'shop-item__image--full': category !== 'growagarden' }"
      />
    </div>
    <div class="shop-item__info">
      <span class="shop-item__price">{{ price }} ₽</span>
      <span class="shop-item__name">{{ snakeToSentence(name) }}</span>
    </div>
    <ui-button-base
      icon="buy-3"
      :text="$t('shop.buy.button')"
      size="42"
      class="shop-item__button"
      @click="emit('click')"
    />
  </div>
</template>

<script setup lang="ts">
import type { ShopItem } from '@/types'

export type ShopItemProps = ShopItem
type Emit = {
  (e: 'click'): void
}

defineProps<ShopItemProps>()
const emit = defineEmits<Emit>()
</script>

<style scoped lang="scss">
.shop-item {
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
    overflow: hidden;
  }

  &__image {
    width: 100px;
    height: 100px;
    object-fit: cover;

    &--full {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
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

  &__button {
    margin-top: auto;
  }
}
</style>
