<template>
  <div class="robux-buy-6">
    <ui-card class="robux-buy-6__card">
      <nuxt-img
        src="/images/template/template.png"
        class="robux-buy-6__avatar"
      />
      <div class="robux-buy-6__sum">
        <span>+{{ getValue }}</span>
        <ui-icon-base name="robux" class="robux-buy-6__icon-robux" />
      </div>
      <span>{{ $t('robux.buy.step-6.cardText') }}</span>
      <ui-icon-base
        name="robux"
        class="robux-buy-6__icon robux-buy-6__icon-1"
      />
      <ui-icon-base
        name="robux"
        class="robux-buy-6__icon robux-buy-6__icon-2"
      />
      <ui-icon-base
        name="robux"
        class="robux-buy-6__icon robux-buy-6__icon-3"
      />
    </ui-card>
    <div class="robux-buy-6__alert">
      <span>{{ $t('robux.buy.step-6.alert') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'
import { LocalStorageKeys } from '@/types/enums'

const { getValue } = storeToRefs(useRobuxBuyStore())

onBeforeUnmount(() => {
  localStorage.removeItem(LocalStorageKeys.STEPS_DATA_LOCAL_STORAGE_KEY)
})
</script>

<style scoped lang="scss">
.robux-buy-6 {
  @include column(18px);

  &__card {
    @include column;

    position: relative;
    align-items: center;
    text-align: center;
    width: 100%;
  }

  &__sum {
    @include row(5px);

    margin-top: 10px;
    color: var(--white);

    span {
      font: var(--font-base-bold) !important;
    }
  }

  &__avatar {
    width: 64px;
    height: 64px;
    border-radius: 18px;
  }

  &__alert {
    font: var(--font-base-medium);
  }

  span {
    font: var(--font-base-medium);
  }

  &__icon {
    position: absolute;
    color: var(--white);
    opacity: 0.2;

    &-robux {
      font-size: 22px;
      color: var(--yellow-500);
    }

    &-1 {
      font-size: 56px;
      top: 46px;
      left: 35px;
      opacity: 0.1;
    }
    &-2 {
      font-size: 54px;
      top: 23px;
      right: 51px;
    }
    &-3 {
      font-size: 40px;
      top: 86px;
      right: 20px;
      opacity: 0.1;
    }
  }
}
</style>
