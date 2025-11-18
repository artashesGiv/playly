<template>
  <ExpandedViewport />
  <FullscreenViewport v-if="!isDesktop" />
  <div v-if="isMounted" class="app">
    <nuxt-layout>
      <nuxt-page :keepalive="{ max: 10 }" />
    </nuxt-layout>
    <div class="app__popups">
      <transition name="slide-bottom">
        <shop-v2-active-withdraw-card
          v-if="allWithdraws.length && !isVisitOrders"
        />
      </transition>
    </div>
  </div>
  <noscript>
    <img
      src="https://mc.yandex.ru/watch/103271069"
      style="position: absolute; left: -9999px"
      alt=""
    />
  </noscript>
  <auth-modal v-model:is-open="authModalOpen" />
  <error-modal v-model:is-open="errorModalOpen" />
  <shop-v2-how-to-work-modal v-model:is-open="isOpenModal" />
</template>

<script lang="ts" setup>
import { ExpandedViewport, FullscreenViewport } from 'vue-tg'
import { useAuthStore, useShopV2FlowStore, useShopV2Store } from '@/store'

const isMounted = ref(false)

const { authModalOpen, errorModalOpen } = storeToRefs(useAuthStore())
const { isOpenModal } = storeToRefs(useShopV2FlowStore())
const { getWithdraws } = useShopV2Store()
const { allWithdraws, isVisitOrders } = storeToRefs(useShopV2Store())

const { viewport, tg } = useTelegram()

const isDesktop = computed(() =>
  ['tdesktop', 'macos', 'web', 'weba'].includes(tg.platform),
)

let timeout: Timeout

onMounted(async () => {
  await useStartApp()

  viewport.expand()

  isMounted.value = true

  timeout = setTimeout(async () => {
    await getWithdraws()
  }, 3000)
})

onBeforeUnmount(() => {
  clearTimeout(timeout)
})
</script>

<style scoped lang="scss">
.app {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;

  &__popups {
    position: absolute;
    padding: 0 16px;
    bottom: calc(
      var(--navigation-height) + var(--tg-content-safe-area-inset-bottom) +
        var(--tg-safe-area-inset-bottom) + 18px
    );
    left: 0;
    width: 100%;
    z-index: calc(var(--modal-index) - 1);
  }
}
</style>
