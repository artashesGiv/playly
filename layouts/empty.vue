<template>
  <div class="layout">
    <main class="layout__content container">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout {
  @include column;

  overflow: hidden;
  height: 100vh;
  padding-top: calc(
    var(--tg-content-safe-area-inset-top) + var(--tg-safe-area-inset-top)
  );
  padding-bottom: calc(
    var(--tg-content-safe-area-inset-bottom) + var(--tg-safe-area-inset-bottom)
  );

  &__content {
    @include column;

    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    transition: var(--transition-base);
    flex: 1 1 0;
  }
}
</style>
