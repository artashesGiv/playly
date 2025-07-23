<template>
  <div class="robux-balance">
    <div class="robux-balance__gradient" />
    <robux-balance-main />
    <robux-balance-interactive />
    <robux-balance-history-card
      v-for="(item, index) in transactions"
      :key="index"
      v-bind="item"
    />
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

definePageMeta({
  layout: 'empty',
})
useBackButton()

const { fetchTransactions } = useRobuxBuyStore()
const { transactions } = storeToRefs(useRobuxBuyStore())

onMounted(async () => {
  await fetchTransactions()
})
</script>

<style scoped lang="scss">
.robux-balance {
  @include column(18px);

  padding: 18px 0;

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 226px;
    background: var(--yellow-gradient);
  }
}
</style>
