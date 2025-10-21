<template>
  <header class="header">
    <main-logo />
    <div class="header__right">
      <transition-fade>
        <ui-card v-if="currencyBalance" class="header__balance">
          <span>
            {{ currencyBalance.RUB }}
            {{ prefix.RUB }}
          </span>
          <ui-icon-base name="wallet" />
        </ui-card>
      </transition-fade>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { currencyPrefix } from '@/assets/content/currency'

const { currencyBalance } = storeToRefs(useUserStore())
const prefix = computed(() => currencyPrefix)
</script>

<style scoped lang="scss">
.header {
  @include row;

  justify-content: space-between;
  height: var(--header-height);
  background-color: var(--dark-1000);

  &__right {
    @include row(12px);
  }

  &__robux {
    cursor: pointer;
  }

  &__balance {
    @include row(8px);

    span {
      font: var(--font-base-bold);
      color: var(--white);
    }
  }
}
</style>
