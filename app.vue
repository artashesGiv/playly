<template>
  <div class="app">
    <nuxt-layout>
      <nuxt-page :transition="{ name: 'fade', mode: 'out-in' }" />
    </nuxt-layout>
  </div>
</template>

<script lang="ts" setup>
// import { useAuthStore } from '@/store'

const { tg } = useTelegram()
// const { login } = useAuthStore()

onMounted(async () => {
  tg?.disableVerticalSwipes()

  // await login()
})
</script>

<style scoped lang="scss">
.app {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
