<template>
  <ui-card class="pay-card" :class="{ 'is-active': isActive }">
    <nuxt-img :src="`/images/pay-cards/${type}.png`" />
  </ui-card>
</template>

<script setup lang="ts">
export type PayCard = {
  type: 'bitcoin' | 'youmoney' | 'mastercard' | 'visa' | 'tether' | 'gpay'
  isActive?: boolean
}

defineProps<PayCard>()
</script>

<style scoped lang="scss">
.pay-card {
  cursor: pointer;
  transition: var(--transition-base);

  &:hover {
    background-color: var(--dark-700);
  }

  &.is-active {
    background-color: var(--dark-600);
    border-color: var(--light-800);

    &:hover {
      background-color: var(--dark-500);
      border-color: var(--light-700);
    }
  }
}
</style>
