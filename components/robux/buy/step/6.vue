<template>
  <div class="robux-buy-6">
    <success-get-robux-card :get-value="getValue" />
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
  localStorage.removeItem(LocalStorageKeys.BUT_ROBUX_STEPS_DATA)
})
</script>

<style scoped lang="scss">
.robux-buy-6 {
  @include column(18px);

  &__alert {
    font: var(--font-base-medium);
  }

  span {
    font: var(--font-base-medium);
  }
}
</style>
