<template>
  <div class="layout">
    <main class="layout__content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout {
  height: 100vh;
  position: relative;
  padding-top: calc(
    var(--tg-content-safe-area-inset-top) + var(--tg-safe-area-inset-top)
  );
  padding-bottom: calc(
    var(--tg-content-safe-area-inset-bottom) + var(--tg-safe-area-inset-bottom)
  );

  &__content {
    transition: var(--transition-base);
    padding: 32px 16px 18px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
