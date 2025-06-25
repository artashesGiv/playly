<template>
  <div class="divider">
    <div class="divider__line" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.divider {
  width: 100%;

  padding-top: 18px;
  padding-bottom: 18px;

  &__line {
    width: 100%;
    height: 1px;
    background-color: var(--dark-900);
  }
}
</style>
