<template>
  <div class="robux">
    <div class="robux__gradient" />
    <robux-main />
    <robux-interactive />
    <robux-tasks />
  </div>
</template>

<script setup lang="ts">
useBackButton()
</script>

<style scoped lang="scss">
.robux {
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
