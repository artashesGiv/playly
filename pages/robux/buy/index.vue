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
        :is-disabled="isButtonDisableMap[step]"
        size="52"
        :icon="step === 5 ? 'robux' : undefined"
        :text="buttonTextMap[step]"
        @click="nextStep"
      />
      <ui-button-base
        v-if="step !== 5"
        size="52"
        view="secondary"
        :text="$t('robux.buy.buttons.help')"
        icon-right="information-circle"
        @click="isOpenModal = true"
      />
    </div>

    <robux-buy-how-to-work-modal
      v-model:is-open="isOpenModal"
      class="robux-buy__modal"
    />
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'
import type { RobuxBuySteps } from '@/types'

definePageMeta({
  layout: 'empty',
})

const router = useRouter()
const { tg } = useTelegram()
const { t } = useI18n()
const { step, stepsData, gamepasses, getValue, activePayType } =
  storeToRefs(useRobuxBuyStore())
const { resetStepsData, nextStep } = useRobuxBuyStore()

const isOpenModal = ref(false)

const stepsMap: Record<RobuxBuySteps, Component> = {
  1: defineAsyncComponent(() => import('@/components/robux/buy/step/1.vue')),
  2: defineAsyncComponent(() => import('@/components/robux/buy/step/2.vue')),
  3: defineAsyncComponent(() => import('@/components/robux/buy/step/3.vue')),
  4: defineAsyncComponent(() => import('@/components/robux/buy/step/4.vue')),
  5: defineAsyncComponent(() => import('@/components/robux/buy/step/5.vue')),
  6: defineAsyncComponent(() => import('@/components/robux/buy/step/6.vue')),
}

const isButtonDisableMap = computed<Record<RobuxBuySteps, boolean>>(() => ({
  1: !stepsData.value.roblox_id,
  2: !stepsData.value.universe_id,
  3: !!gamepasses.value.length && !stepsData.value.gamepass_id,
  4: false,
  5: !activePayType.value,
  6: false,
}))

const buttonTextMap = computed<Record<RobuxBuySteps, string>>(() => ({
  1: t('robux.buy.step-1.nextButton'),
  2: t('robux.buy.step-2.nextButton'),
  3: gamepasses.value.length
    ? t('robux.buy.step-3.nextButtonSelect')
    : t('robux.buy.step-3.nextButtonCreate'),
  4: t('robux.buy.step-4.nextButton'),
  5: `${t('common.buy', { sum: getValue.value })} R$`,
  6: t('robux.buy.step-6.nextButton'),
}))

function handleBack() {
  if (step.value <= 1) {
    router.back()
  } else if (step.value === 5) {
    navigateTo('/robux')
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
  resetStepsData()
})
</script>

<style scoped lang="scss">
.robux-buy {
  @include column(18px);
  height: 100%;

  &__content {
    @include column(18px);

    flex-grow: 1;
    overflow-y: auto;
  }

  &__footer {
    @include column(10px);
  }
}
</style>
