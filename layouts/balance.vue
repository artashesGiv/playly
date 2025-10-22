<template>
  <div class="layout">
    <main class="layout__content">
      <currency-balance-header class="layout__header" />
      <slot />
    </main>

    <main-navigation class="layout__footer" />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.layout {
  @include column;

  position: relative;
  overflow: hidden;
  height: 100vh;
  padding-top: calc(
    var(--tg-content-safe-area-inset-top) + var(--tg-safe-area-inset-top)
  );
  padding-bottom: calc(
    var(--tg-content-safe-area-inset-bottom) + var(--tg-safe-area-inset-bottom)
  );

  &__header {
    flex-shrink: 0;
  }

  &__content {
    @include column;

    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 16px;
    box-sizing: border-box;
    transition: var(--transition-base);
    flex: 1 1 0;
  }
}
</style>
