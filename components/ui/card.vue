<template>
  <article class="card">
    <slot />
  </article>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.card {
  padding: 14px;
  background-color: var(--dark-900);
  border-radius: 22px;
}
</style>
