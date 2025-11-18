<template>
  <article :class="classes">
    <div class="balance-card__content">
      <AnimateNumber
        locales="ru-RU"
        :transition="{
          visualDuration: 0.6,
          type: 'spring',
          bounce: 0.25,
          opacity: { duration: 0.3, ease: 'linear' },
        }"
        :style="{ fontSize: size === 'xl' ? '22px' : '16px' }"
        :value="sum || 0"
      />

      <main-mascot v-if="type === 'coin'" size="s" />
      <ui-icon-base v-else name="robux" class="balance-card__icon" />
    </div>
    <span v-if="size === 'xl'" class="balance-card__text">
      {{ $t('coins.balanceText') }}
    </span>
  </article>
</template>

<script setup lang="ts">
import { AnimateNumber } from 'motion-plus-vue'

// type
export type BalanceCardProps = {
  size?: 's' | 'xl'
  type?: 'coin' | 'robux'
  sum: Maybe<number>
}

const props = withDefaults(defineProps<BalanceCardProps>(), {
  size: 's',
  type: 'coin',
})

// computed
const classes = computed(() => [
  'balance-card',
  `balance-card--size--${props.size}`,
])
</script>

<style scoped lang="scss">
.balance-card {
  $b: &;

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

  &__icon {
    font-size: 22px;
    color: var(--yellow-500);
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
