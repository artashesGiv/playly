<template>
  <div class="logo">
    <nuxt-img src="/images/main/logo.png" class="logo__square" />
    <span> Playly </span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
  @include row(4px);

  height: 30px;
  color: var(--white);
  font: var(--font-massive-bold);

  &__square {
    width: 26px;
  }
}
</style>
