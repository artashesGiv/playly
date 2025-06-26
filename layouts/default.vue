<template>
  <div class="layout" :class="{ 'is-header': isVisibleHeader }">
    <transition-fade>
      <main-header v-if="isVisibleHeader" class="layout__header" />
    </transition-fade>

    <main class="layout__content">
      <slot />
    </main>

    <main-navigation class="layout__footer" />
  </div>
</template>

<script setup>
const pagesWithoutHeader = ['/robux']

const route = useRoute()

const isVisibleHeader = computed(() => !pagesWithoutHeader.includes(route.path))
</script>

<style scoped lang="scss">
.layout {
  $b: &;

  height: 100vh;
  position: relative;

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
    transition: var(--transition-base);
    padding: 18px 16px 18px 16px;
    height: calc(100% - var(--navigation-height));
    overflow-y: auto;
    overflow-x: hidden;
  }

  &.is-header {
    #{$b}__content {
      height: calc(100% - (var(--header-height) + var(--navigation-height)));
      margin-top: var(--header-height);
    }
  }
}
</style>
