<template>
  <div class="index">
    <main-coin />
    <balance-card size="xl" />
    <ui-divider />
    <bounty-lists />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'

const { getUserInfo } = useUserStore()

const MainCoin = defineAsyncComponent(
  () => import('@/components/balance/main-click.vue'),
)

onMounted(async () => {
  await getUserInfo()
})
</script>

<style scoped lang="scss">
.index {
  @include column(18px);
}
</style>
