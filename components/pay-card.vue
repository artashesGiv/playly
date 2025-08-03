<template>
  <ui-card class="pay-card" :class="classes" :is-error="isError">
    <nuxt-img :src="`/images/pay-cards/${type}.png`" class="pay-card__images" />
  </ui-card>
</template>

<script setup lang="ts">
export type PayCard = {
  type: Payments
  isActive?: boolean
  isError?: boolean
}

const props = defineProps<PayCard>()

const classes = computed(() => [{ 'is-active': props.isActive }])
</script>

<style scoped lang="scss">
.pay-card {
  @include row;

  justify-content: center;
  cursor: pointer;
  transition: var(--transition-base);
  border: 1px solid transparent;

  &__images {
    height: 50px;
    width: auto;
  }

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
