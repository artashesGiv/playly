<template>
  <article class="shop-game-card" :class="classes">
    <div class="shop-game-card__image-wrapper">
      <nuxt-img :src="image_url" class="shop-game-card__image" />
    </div>
    <div class="shop-game-card__data">
      <span class="shop-game-card__title font-large-semibold">
        {{ snakeToSentence(name) }}
      </span>
      <span class="shop-game-card__description font-base-medium">
        {{ $t('market.games.card.count', { n: total_items }) }}
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ShopV2Game } from '@/types'

export type ShopV2GameCardProps = ShopV2Game & {
  direction?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<ShopV2GameCardProps>(), {
  direction: 'vertical',
})

const classes = computed(() => [
  'shop-game-card',
  `shop-game-card--direction--${props.direction}`,
])
</script>

<style scoped lang="scss">
.shop-game-card {
  $b: &;

  overflow: hidden;
  cursor: pointer;

  &--direction {
    &--horizontal {
      @include row(14px);

      padding: 12px;
      background-color: var(--dark-900);
      border-radius: 8px;
      height: 80px;

      #{$b}__image {
        width: 70px;
        height: 56px;
        border-radius: 8px;
      }
    }

    &--vertical {
      width: 205px;
      height: 205px;
      border: 2px solid var(--dark-800);
      border-radius: 20px;

      #{$b}__image {
        height: 130px;
        width: 100%;
        object-fit: cover;

        &-wrapper {
          position: relative;
          height: 130px;

          &::before {
            content: '';
            background: linear-gradient(
              180deg,
              rgba(25, 24, 27, 0) 0%,
              #19181b 100%
            );
            position: absolute;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 3;
          }
        }
      }
      #{$b}__data {
        background-color: var(--dark-900);
        padding: 12px;
      }
    }
  }

  &__data {
    @include column;
  }

  &__title {
    color: var(--white);
  }
}
</style>
