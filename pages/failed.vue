<template>
  <div class="failed">
    <h2 class="font-massive-bold">FAILED</h2>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})
</script>

<style scoped lang="scss">
.failed {
  @include column;

  height: 100%;
  align-items: center;
  justify-content: center;
  color: var(--red-500);
}
</style>
