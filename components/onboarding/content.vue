<template>
  <onboarding-step-layout>
    <transition-fade>
      <component :is="componentMap[step]" :key="step" />
    </transition-fade>
  </onboarding-step-layout>
</template>

<script setup lang="ts">
export type OnboardingContentProps = {
  step: OnboardingStep
}

defineProps<OnboardingContentProps>()

const componentMap: Record<OnboardingContentProps['step'], Component> = {
  '1': defineAsyncComponent(() => import('@/components/onboarding/step/1.vue')),
  '2': defineAsyncComponent(() => import('@/components/onboarding/step/2.vue')),
  '3': defineAsyncComponent(() => import('@/components/onboarding/step/3.vue')),
}
</script>

<style scoped lang="scss"></style>
