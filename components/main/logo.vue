<template>
  <div class="logo">
    <div class="logo__square" />
    <span> Playly </span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
  @include row(12px);

  height: 36px;
  color: var(--light-500);
  font: var(--font-massive);

  &__square {
    width: 31px;
    height: 31px;
    border-radius: 11.33px;
    background-color: var(--light-500);
  }
}
</style>
