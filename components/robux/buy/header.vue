<template>
  <div class="buy-header">
    <div class="buy-header__text">
      <h2 class="title">{{ headerTextMap[step].title }}</h2>
      <span class="description">{{ headerTextMap[step].description }}</span>
    </div>
    <ui-stauts-bar :progress="step" :max="6" />
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

type RobuxBuyHeader = {
  title: string
  description: string
}

const { step, gamepasses } = storeToRefs(useRobuxBuyStore())
const { t } = useI18n()

const headerTextMap: Record<number, RobuxBuyHeader> = {
  1: {
    title: t('robux.buy.step-1.title'),
    description: t('robux.buy.step-1.description'),
  },
  2: {
    title: t('robux.buy.step-2.title'),
    description: t('robux.buy.step-2.description'),
  },
  3: {
    title: gamepasses.value.length
      ? t('robux.buy.step-3.titleSelect')
      : t('robux.buy.step-3.titleCreate'),
    description: gamepasses.value.length
      ? t('robux.buy.step-3.descriptionSelect')
      : t('robux.buy.step-3.descriptionCreate'),
  },
  4: {
    title: t('robux.buy.step-4.title'),
    description: t('robux.buy.step-4.description'),
  },
  5: {
    title: t('robux.buy.step-5.title'),
    description: t('robux.buy.step-5.description'),
  },
  6: {
    title: t('robux.buy.step-6.title'),
    description: t('robux.buy.step-6.description'),
  },
}
</script>

<style scoped lang="scss">
.buy-header {
  @include column(18px);

  &__text {
    @include column(2px);
    text-align: center;
  }
}
</style>
