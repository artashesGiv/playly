<template>
  <nav class="navigation">
    <main-nav-item
      v-for="item in useNavigation()"
      :key="item.src"
      v-bind="item"
      class="navigation__item"
    />
  </nav>
</template>

<script setup lang="ts">
import { useNavigation } from '@/assets/content'
</script>

<style scoped lang="scss">
.navigation {
  @include row;

  justify-content: space-between;
  width: 100%;
  height: var(--navigation-height);
  background-color: var(--dark-1000);
  border-top: 2px solid #232225;
  padding: 0 12px;

  &__item {
    flex: 1 1 0;
  }
}
</style>
