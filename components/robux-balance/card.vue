<template>
  <ui-balance-card :size="size" :sum="robuxBalance" type="robux" />
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'

//type
export type RobuxBalanceProps = {
  size?: 's' | 'xl'
}

withDefaults(defineProps<RobuxBalanceProps>(), {
  size: 's',
})

// store
const { robuxBalance } = storeToRefs(useUserStore())
</script>
