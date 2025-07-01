<template>
  <div class="app">
    <nuxt-layout>
      <nuxt-page :transition="{ name: 'fade', mode: 'out-in' }" />
    </nuxt-layout>
  </div>
</template>

<script lang="ts" setup>
const { tg } = useTelegram()

onMounted(() => {
  tg?.disableVerticalSwipes()
})
</script>

<style scoped lang="scss">
.app {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
