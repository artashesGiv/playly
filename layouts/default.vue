<template>
  <div class="layout">
    <header class="layout__header">
      <span>Header</span>
    </header>

    <main class="layout__content">
      <slot />
    </main>

    <footer class="layout__footer">
      <span>Bottom Nav</span>
    </footer>
  </div>
</template>

<script setup>
// ничего не требуется
</script>

<style scoped lang="scss">
.layout {
  height: 100vh;

  &__header {
    @include center('stretch', fixed);
    @include row;

    justify-content: center;

    height: 48px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    z-index: 100;
  }

  &__footer {
    @include row;

    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    z-index: 100;
  }

  &__content {
    padding: 60px 20px 56px 20px;
    min-height: 100vh;
    box-sizing: border-box;
  }
}
</style>
