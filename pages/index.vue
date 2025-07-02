<template>
  <div class="index">
    user: {{ userInfo }}
    <balance-main-click />
    <balance-card size="xl" />
    <ui-divider />
    <bounty-lists />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'

const { userInfo } = storeToRefs(useUserStore())
</script>

<style scoped lang="scss">
.index {
  @include column(18px);
}
</style>
