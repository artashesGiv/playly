<template>
  <ui-balance-card :size="size" :sum="balance" />
</template>

<script setup lang="ts">
import { useBalanceStore } from '@/store'

//type
export type BalanceProps = {
  size?: 's' | 'xl'
}

withDefaults(defineProps<BalanceProps>(), {
  size: 's',
})

// store
const { balance } = storeToRefs(useBalanceStore())
</script>
