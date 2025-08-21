<template>
  <div class="robux-banner">
    <nuxt-img
      v-for="item in 2"
      :key="item"
      src="/images/onboarding/decor.png"
      :class="['robux-banner__image', `robux-banner__image--${item}`]"
    />
    <nuxt-img
      src="/images/main/robux.png"
      class="robux-banner__image robux-banner__image--robux"
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

    &--1 {
      width: 179px;
      top: 0;
      left: -104px;
      transform: rotate(16deg);
    }

    &--2 {
      width: 167px;
      top: 20px;
      right: -70px;
      transform: rotate(-16deg);
    }

    &--robux {
      @include center('horizontal');

      top: 14px;
      width: 82px;
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
