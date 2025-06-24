<template>
  <article :class="classes">
    <div class="balance-card__content">
      <span>450</span>
      <main-mascot size="s" />
    </div>
    <span v-if="size === 'xl'" class="balance-card__text">Your balance</span>
  </article>
</template>

<script setup lang="ts">
//type
export type BalanceCardProps = {
  size?: 's' | 'xl'
}

const props = withDefaults(defineProps<BalanceCardProps>(), {
  size: 's',
})

// computed
const classes = computed(() => [
  'balance-card',
  `balance-card--size--${props.size}`,
])
</script>

<style scoped lang="scss">
.balance-card {
  @include column(2px);

  background-color: var(--dark-800);
  justify-content: center;

  &__content {
    @include row(6px);

    font: var(--font-base);
    color: var(--white);
  }

  &--size {
    &--s {
      padding: 0 16px;
      width: max-content;
      border-radius: 20px;
      height: 50px;
    }
    &--xl {
      border-radius: 22px;
      padding: 0 10px;
      width: 100%;
      height: 87px;
    }
  }
}
</style>
