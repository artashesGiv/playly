<template>
  <div class="click">
    <main-mascot size="3xl" is-tap class="click__mascot" @click="balance++" />
    <span>
      {{ $t('coins.title') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'

// store
const { balance } = storeToRefs(useUserStore())
</script>

<style scoped lang="scss">
.click {
  @include column(14px);

  align-items: center;
  text-align: center;
  font: var(--font-base-medium);
}
</style>
