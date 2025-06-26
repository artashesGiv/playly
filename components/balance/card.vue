<template>
  <article :class="classes">
    <div class="balance-card__content">
      <AnimateNumber
        locales="ru-RU"
        class="number"
        :transition="{
          visualDuration: 0.6,
          type: 'spring',
          bounce: 0.25,
          opacity: { duration: 0.3, ease: 'linear' },
        }"
        :value="balance"
      />
      <main-mascot size="s" />
    </div>
    <span v-if="size === 'xl'" class="balance-card__text">Your balance</span>
  </article>
</template>

<script setup lang="ts">
import { useBalanceStore } from '@/store'
import { AnimateNumber } from 'motion-plus-vue'

//type
export type BalanceCardProps = {
  size?: 's' | 'xl'
}

const props = withDefaults(defineProps<BalanceCardProps>(), {
  size: 's',
})

// store
const { balance } = storeToRefs(useBalanceStore())

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

    font: var(--font-base-bold);
    color: var(--white);
    font-variant-numeric: tabular-nums;
    align-self: center;
  }

  &__text {
    font: var(--font-base-medium);
  }

  &--size {
    &--s {
      padding: 0 16px;
      width: max-content;
      border-radius: 20px;
      height: 50px;
    }
    &--xl {
      text-align: center;
      border-radius: 22px;
      padding: 0 10px;
      width: 100%;
      height: 87px;
    }
  }
}
</style>
