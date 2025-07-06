<template>
  <header class="header">
    <main-logo />
    <div class="header__right">
      <robux-balance-card
        class="header__robux"
        @click="navigateTo('/robux/balance')"
      />
      <balance-card />
    </div>
  </header>
</template>

<script setup lang="ts"></script>

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
}
</style>
