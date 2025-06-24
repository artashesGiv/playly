<template>
  <div class="layout">
    <main-header class="layout__header" />

    <main class="layout__content">
      <slot />
    </main>

    <main-navigation class="layout__footer" />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.layout {
  height: 100vh;

  &__header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
  }

  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
  }

  &__content {
    margin-top: var(--header-height);
    padding: 18px 16px 18px 16px;
    height: calc(100% - (var(--header-height) + var(--navigation-height)));
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
