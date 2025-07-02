<template>
  <div class="click">
    <main-mascot size="3xl" is-tap class="click__mascot" @click="onTap" />
    <span>
      {{ $t('coins.title') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useCoinsStore } from '@/store'

// store
const { onTap } = useCoinsStore()
</script>

<style scoped lang="scss">
.click {
  @include column(14px);

  align-items: center;
  text-align: center;
  font: var(--font-base-medium);
}
</style>
