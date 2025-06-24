<template>
  <div>
    <h1>{{ tg?.initDataUnsafe.user?.first_name }}</h1>
  </div>
</template>

<script setup lang="ts">
const { tg } = useTelegram()
</script>

<style scoped lang="scss"></style>
