<template>
  <bounty-card :sum="500" :text="t('coins.tasks.playlyTg')" />
</template>

<script setup lang="ts">
const { t } = useI18n()

// import { useBalanceStore } from '@/store'
// import type { BountyCardProps } from './index.vue'
//
// type Emits = {
//   (emit: 'click', value: BountyCardProps['sum']): void
// }
//
// const emits = defineEmits<Emits>()
//
// const { addBalance } = useBalanceStore()
// const { tg } = useTelegram()
//
// const onClick = (sum: number) => {
//   tg?.openTelegramLink('https://t.me/omut_pamyatii')
// }
</script>

<style scoped lang="scss"></style>
