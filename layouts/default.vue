<template>
  <div class="layout">
    <transition-fade>
      <main-header class="layout__header" />
    </transition-fade>

    <main class="layout__content">
      <slot />
    </main>

    <transition-fade>
      <main-navigation class="layout__footer" />
    </transition-fade>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.layout {
  @include column(18px);

  overflow: hidden;
  height: 100vh;
  padding-top: calc(
    var(--tg-content-safe-area-inset-top) + var(--tg-safe-area-inset-top)
  );

  &__header {
    border: 1px solid red;
  }

  &__content {
    padding: 18px 16px;
    margin-top: -18px;
    margin-bottom: -18px;
    flex: 1 1 0;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    transition: var(--transition-base);
  }
}
</style>
