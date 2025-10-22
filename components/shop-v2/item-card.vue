<template>
  <article :class="classes">
    <div
      class="shop-v2-item-card__indicator"
      :style="{
        backgroundColor: `var(--${mapRareColor[data?.rarity || ''] || 'light'}-500)`,
      }"
    />
    <div
      class="shop-v2-item-card__image-wrapper"
      :style="{
        background: `var(--${mapRareColor[data?.rarity || ''] || 'light'}-gradient-active)`,
      }"
    >
      <nuxt-img :src="image_url" class="shop-v2-item-card__image" />
    </div>
    <div class="shop-v2-item-card__data">
      <span>
        {{ snakeToSentence(data?.item_type || '') }}
      </span>
      <span>
        {{ snakeToSentence(name || '') }}
      </span>
      <span> {{ price }}₽ </span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ShopV2Item } from '@/types'

export type ShopV2ItemProps = Partial<ShopV2Item> & {
  size?: 'xs' | 'm' | 'l'
}

const props = withDefaults(defineProps<ShopV2ItemProps>(), {
  size: 'm',
})

const classes = computed(() => [
  'shop-v2-item-card',
  `shop-v2-item-card--size--${props.size}`,
])
</script>

<style scoped lang="scss">
.shop-v2-item-card {
  $b: &;

  @include column;

  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 2px solid var(--dark-800);
  border-radius: 20px;

  &__indicator {
    @include center('horizontal');

    top: 0;
    height: 4px;
    border-radius: 0 0 12px 12px;
    z-index: 5;
  }

  &__image {
    position: relative;
    z-index: 4;
    object-fit: contain;

    &-wrapper {
      @include row;

      justify-content: center;

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
        height: 30px;
        width: 100%;
        z-index: 3;
      }
    }
  }

  &__data {
    @include column;

    background-color: var(--dark-900);
    padding: 12px;
    flex-grow: 1;

    span:nth-child(2) {
      color: var(--light-100);
    }

    span:nth-child(3) {
      color: var(--white);
    }
  }

  &--size {
    &--xs {
      height: 62px;
      width: 62px;
      border: none;

      #{$b}__image {
        width: 40px;
        height: 40px;

        &-wrapper:before {
          background: linear-gradient(
            180deg,
            rgba(25, 24, 27, 0) 0%,
            #28272b 100%
          );
        }
      }

      #{$b}__indicator {
        width: 26px;
      }

      #{$b}__data {
        display: none;
      }
    }

    &--m {
      height: 205px;

      #{$b}__image {
        width: 80px;
        height: auto;
      }

      #{$b}__indicator {
        width: 46px;
      }

      #{$b}__data {
        span:nth-child(1) {
          font: var(--font-normal-medium);
        }

        span:nth-child(2) {
          font: var(--font-base-medium);
        }

        span:nth-child(3) {
          font: var(--font-large-semibold);
        }
      }
    }
    &--l {
      height: 255px;

      #{$b}__image {
        width: 120px;
        height: 120px;
      }

      #{$b}__indicator {
        width: 108px;
      }

      #{$b}__data {
        span:nth-child(1) {
          font: var(--font-base-medium);
        }

        span:nth-child(2) {
          font: var(--font-large-medium);
        }

        span:nth-child(3) {
          font: var(--font-very-large-semibold);
        }
      }
    }
  }
}
</style>
