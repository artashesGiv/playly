<template>
  <ui-card class="timer-card">
    <div class="timer-card__icon">
      <ui-icon-base name="loader-2" />
    </div>
    <div class="timer-card__text">
      <span>{{ countdown }}</span>
      <span>{{ $t('profile.withdraw.timerCard.timeLeft') }}</span>
    </div>
    <!--    <ui-button-base size="42" :text="$t('common.cansel')" max-content />-->
  </ui-card>
</template>

<script setup lang="ts">
import { useItemsStore } from '@/store'

const { item } = storeToRefs(useItemsStore())
const countdown = useCountdown(
  computed(() => item.value?.starpets_withdraw_timer || ''),
)
</script>

<style scoped lang="scss">
.timer-card {
  @include row(10px);

  &__icon {
    @include row;

    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 16px;
    background-color: var(--light-800);
    color: var(--light-300);

    i {
      animation: rotate360 1s infinite linear;
    }
  }

  &__text {
    @include column;

    flex: 1 1 0;

    span:first-child {
      font: var(--font-base-semibold);
      color: var(--white);
    }

    span:last-child {
      font: var(--font-normal-medium);
    }
  }
}
</style>
