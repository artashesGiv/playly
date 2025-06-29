<template>
  <div class="buy-header">
    <div class="buy-header__text">
      <h2 class="title">{{ $t('robux.buy.title') }}</h2>
      <span class="description">{{ $t('robux.buy.description') }}</span>
    </div>
    <ui-stauts-bar :progress="step" :max="5" />
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

const { step } = storeToRefs(useRobuxBuyStore())
</script>

<style scoped lang="scss">
.buy-header {
  @include column(18px);

  &__text {
    @include column(2px);
    text-align: center;
  }
}
</style>
