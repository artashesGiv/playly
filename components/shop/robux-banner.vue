<template>
  <div class="robux-banner">
    <nuxt-img
      v-for="item in 2"
      :key="`robux-${item}`"
      :src="`/images/shop/banner/gift-${item}.png`"
      :class="['robux-banner__image', `robux-banner__image--${item}`]"
    />
    <ui-icon-base
      v-for="item in 2"
      :key="`star-${item}`"
      name="star"
      class="robux-banner__icon-star"
      :class="`robux-banner__icon-star--${item}`"
    />
    <nuxt-img
      src="/images/main/robux.png"
      class="robux-banner__image robux-banner__image--robux"
    />
    <ui-icon-base
      v-for="item in 2"
      :key="item"
      name="robux"
      class="robux-banner__icon"
      :class="`robux-banner__icon--${item}`"
    />
    <div class="robux-banner__price">
      100 ₽ = {{ rates!.rub2robux * 100 }} R$
    </div>
    <div class="robux-banner__content">
      <span class="title">{{ $t('shop.robux_banner.title') }}</span>
      <span class="description">
        {{ $t('shop.robux_banner.description') }}
      </span>
      <ui-button-base
        :text="$t('shop.robux_banner.button')"
        size="42"
        view="white"
        class="robux-banner__button"
        @click="navigateTo('/robux')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'

const { rates } = storeToRefs(useAuthStore())
</script>

<style scoped lang="scss">
.robux-banner {
  @include column;

  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background-color: var(--primary-600);
  padding: 14px;
  height: 224px;

  & > * {
    position: relative;
    z-index: 2;
  }

  &__content {
    @include column;

    margin-top: 10px;
  }

  &__image {
    position: absolute;
    width: 88px;
    z-index: 1;

    &--1 {
      top: 12px;
      left: 15px;
    }

    &--2 {
      top: 54px;
      right: 4px;
    }

    &--robux {
      @include center('horizontal');

      top: 14px;
      width: 82px;
    }
  }

  &__icon {
    position: absolute;
    color: var(--white);
    opacity: 0.2;
    top: 38px;
    z-index: 2;
    font-size: 74px;

    &--1 {
      top: 73px;
      left: -23px;
    }
    &--2 {
      top: 8px;
      right: -32px;
    }
  }

  &__icon-star {
    position: absolute;
    color: var(--white);

    &--1 {
      font-size: 21px;
      top: 123px;
      left: 63px;
    }
    &--2 {
      font-size: 28px;
      top: 5px;
      right: 75px;
    }
  }

  span {
    text-align: center;
    color: var(--white);
  }

  &__button {
    margin-top: 12px;
  }

  &__price {
    font: var(--font-normal-bold);
    color: var(--dark-1000);
    align-self: center;
    padding: 8px 12px;
    border-radius: 14px;
    background-color: var(--white);
  }
}
</style>
