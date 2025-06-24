<template>
  <header class="header">
    <main-logo />
    <balance-card size="s" />
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  @include row;

  justify-content: space-between;
  height: var(--header-height);
  background-color: var(--dark-1000);
  padding: 0 16px;
}
</style>
