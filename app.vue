<template>
  <div class="app">tg: {{ tg }}</div>
</template>

<script lang="ts" setup>
const { tg } = useTelegram()
</script>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  border: 1px solid #000;
}
</style>
