<template>
  <ui-card class="history-card">
    <div class="history-card__left">
      <div class="history-card__icon">
        <ui-icon-base :name="icon" />
      </div>
      <div class="history-card__text">
        <h4>{{ $t(`robux.transactions.${props.type}`) }}</h4>
      </div>
    </div>
    <div class="history-card__right">
      {{ props.amount }}
      <ui-icon-base name="robux" />
    </div>
  </ui-card>
</template>

<script setup lang="ts">
import type { RobuxTransactions } from '@/types'

const props = defineProps<RobuxTransactions>()

const icon = computed<Icons>(() => {
  switch (props.type) {
    case 'withdraw_failed':
    case 'rbxspace_withdraw_failed': {
      return 'close-circle'
    }
    default: {
      return 'check-circle'
    }
  }
})
</script>

<style scoped lang="scss">
.history-card {
  @include row(12px);

  justify-content: space-between;

  &__icon {
    @include row;

    justify-content: center;
    background-color: var(--dark-500);
    border-radius: 50%;
    width: 44px;
    height: 44px;

    i {
      font-size: 24px;
    }
  }

  &__left,
  &__right {
    @include row(10px);
  }

  &__text {
    h4 {
      font: var(--font-base-semibold);
      color: var(--white);
    }
  }
  &__right {
    @include row(2px);

    font: var(--font-base-semibold);
    color: var(--white);

    i {
      color: var(--yellow-500);
    }
  }
}
</style>
