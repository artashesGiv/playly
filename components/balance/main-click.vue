<template>
  <div class="click">
    <main-mascot
      size="3xl"
      is-tap
      class="click__mascot"
      @click="onCountBalance"
    />
    <span>
      Earn coins and exchange them for cases with adopt me items and robux
    </span>
  </div>
</template>

<script setup lang="ts">
import { useBalanceStore } from '@/store'

// store
const { onCountBalance } = useBalanceStore()
</script>

<style scoped lang="scss">
.click {
  @include column(14px);

  align-items: center;
  text-align: center;
  font: var(--font-base-medium);
}
</style>
