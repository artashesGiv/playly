<template>
  <div class="index">
    {{ isAuth }}
    {{ data }}
    <balance-main-click />
    <balance-card size="xl" />
    <ui-divider />
    <bounty-lists />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'

const { isAuth, data } = storeToRefs(useAuthStore())
</script>

<style scoped lang="scss">
.index {
  @include column(18px);
}
</style>
