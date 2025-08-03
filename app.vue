<template>
  <ExpandedViewport />
  <FullscreenViewport v-if="!isDesktop" />
  <div v-if="isMounted" class="app">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </div>
  <noscript>
    <img
      src="https://mc.yandex.ru/watch/103271069"
      style="position: absolute; left: -9999px"
      alt=""
    />
  </noscript>
  <auth-modal v-model:is-open="authModalOpen" />
</template>

<script lang="ts" setup>
import { ExpandedViewport, FullscreenViewport } from 'vue-tg'
import { useAuthStore } from '@/store'

const isMounted = ref(false)

const { authModalOpen } = storeToRefs(useAuthStore())

const { viewport, tg } = useTelegram()

const isDesktop = computed(() =>
  ['tdesktop', 'macos', 'web', 'weba'].includes(tg.platform),
)

onMounted(async () => {
  await useStartApp()

  viewport.expand()

  isMounted.value = true
})
</script>

<style scoped lang="scss">
.app {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
