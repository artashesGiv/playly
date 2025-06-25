<template>
  <div class="index">
    <balance-main-click />
    <balance-card size="xl" />
    <ui-divider />
    <bounty-lists />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.index {
  @include column(18px);
}
</style>
