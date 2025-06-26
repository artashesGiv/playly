<template>
  <ui-balance-card :size="size" :sum="robuxBalance" type="robux" />
</template>

<script setup lang="ts">
import { useRobuxBalanceStore } from '@/store'

//type
export type RobuxBalanceProps = {
  size?: 's' | 'xl'
}

withDefaults(defineProps<RobuxBalanceProps>(), {
  size: 's',
})

// store
const { robuxBalance } = storeToRefs(useRobuxBalanceStore())
</script>
