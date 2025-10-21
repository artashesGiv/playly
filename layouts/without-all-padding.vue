<template>
  <main class="layout__content">
    <slot />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout {
  height: 100vh;
  position: relative;

  &__content {
    transition: var(--transition-base);
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
