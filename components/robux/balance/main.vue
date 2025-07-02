<template>
  <div class="robux-main">
    <div class="robux-main__logo">
      <nuxt-img src="/images/main/robux.png" class="robux-main__image" />
      <ui-icon-base name="robux" class="robux-main__icon robux-main__icon-1" />
      <ui-icon-base name="robux" class="robux-main__icon robux-main__icon-2" />
      <ui-icon-base name="robux" class="robux-main__icon robux-main__icon-3" />
      <ui-icon-base name="robux" class="robux-main__icon robux-main__icon-4" />
      <ui-icon-base name="robux" class="robux-main__icon robux-main__icon-5" />
      <ui-icon-base name="robux" class="robux-main__icon robux-main__icon-6" />
    </div>
    <div class="robux-main__text">
      <h2 class="title">{{ robuxBalance }} R$</h2>
      <span>{{ $t('robux.balance.description') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'

const { robuxBalance } = storeToRefs(useUserStore())
</script>

<style scoped lang="scss">
.robux-main {
  @include column(17px);

  &__logo {
    @include column;

    min-width: 375px;
    position: relative;
    align-self: center;
  }

  &__image {
    align-self: center;
    width: 134px;
    height: 134px;
  }

  &__icon {
    position: absolute;
    color: var(--white);
    opacity: 0.2;
    z-index: -1;

    &-1 {
      font-size: 60px;
      top: 0;
      left: 33px;
    }
    &-2 {
      font-size: 38px;
      left: 78px;
      bottom: 6px;
    }
    &-3 {
      font-size: 50px;
      left: 0;
      bottom: 6px;
    }
    &-4 {
      font-size: 60px;
      bottom: 0;
      right: 41px;
    }
    &-5 {
      font-size: 44px;
      top: 3px;
      right: 56px;
    }
    &-6 {
      font-size: 42px;
      top: 25px;
      right: 0;
    }
  }

  &__text {
    text-align: center;

    span {
      font: var(--font-base-medium);
    }
  }
}
</style>
