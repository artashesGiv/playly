<template>
  <div class="robux-balance">
    <div class="robux-balance__gradient" />
    <robux-balance-main />
    <robux-balance-interactive />
    <robux-balance-tasks />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})
useBackButton()
</script>

<style scoped lang="scss">
.robux-balance {
  @include column(18px);

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 226px;
    background: var(--yellow-gradient);
  }
}
</style>
