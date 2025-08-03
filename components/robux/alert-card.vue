<template>
  <ui-card class="robux-alert">
    <span>{{ $t('robux.alert') }}</span>
    <div class="robux-alert__right">
      <div class="robux-alert__prev-price">
        {{ (getValue / 1.96).toFixed(0) }}
      </div>
      <div class="robux-alert__price">
        {{ getValue }}
        <ui-icon-base name="robux" class="robux-alert__icon" />
      </div>
    </div>
  </ui-card>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

const COEFICENT = 1.96

const { getValue } = storeToRefs(useRobuxBuyStore())
</script>

<style scoped lang="scss">
.robux-alert {
  @include row(12px);

  justify-content: space-between;
  font: var(--font-base-medium);
  border-radius: 18px;

  &__right {
    @include row(8px);
  }

  &__prev-price {
    text-decoration: line-through;
  }

  &__price {
    @include row(8px);

    color: var(--white);
  }

  &__icon {
    font-size: 18px;
    color: var(--yellow-500);
  }
}
</style>
