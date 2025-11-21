<template>
  <div class="success">
    <h2 class="font-massive-bold">SUCCESS</h2>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})
</script>

<style scoped lang="scss">
.success {
  @include column;

  height: 100%;
  align-items: center;
  justify-content: center;
  color: var(--green-500);
}
</style>
