<template>
  <div class="robux-buy">
    <robux-buy-header />
    <ui-divider />
    <transition-fade>
      <div :key="step" class="robux-buy__content">
        <component :is="stepsMap[step]" />
      </div>
    </transition-fade>
    <div class="robux-buy__footer">
      <ui-button-base
        :is-disabled="!activeUser"
        size="52"
        :text="$t('robux.buy.buttons.main')"
        @click="step += 1"
      />
      <ui-button-base
        size="52"
        view="secondary"
        :text="$t('robux.buy.buttons.help')"
        icon-right="information-circle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

definePageMeta({
  layout: 'empty',
})

const router = useRouter()
const { tg } = useTelegram()
const { step, activeUser } = storeToRefs(useRobuxBuyStore())

const stepsMap: Record<number, Component> = {
  1: defineAsyncComponent(() => import('@/components/robux/buy/step/1.vue')),
  2: defineAsyncComponent(() => import('@/components/robux/buy/step/2.vue')),
  3: defineAsyncComponent(() => import('@/components/robux/buy/step/3.vue')),
  4: defineAsyncComponent(() => import('@/components/robux/buy/step/4.vue')),
  5: defineAsyncComponent(() => import('@/components/robux/buy/step/5.vue')),
}

function handleBack() {
  if (step.value <= 1) {
    router.back()
  } else {
    step.value--
  }
}

onMounted(() => {
  tg?.BackButton.show?.()

  tg?.BackButton.offClick?.(handleBack)

  tg?.BackButton.onClick(handleBack)
})

onUnmounted(() => {
  tg?.BackButton.offClick?.(handleBack)

  tg?.BackButton.hide?.()
})
</script>

<style scoped lang="scss">
.robux-buy {
  @include column(18px);
  height: 100%;

  &__content {
    @include column(18px);

    flex-grow: 1;
  }

  &__footer {
    @include column(10px);
  }
}
</style>
