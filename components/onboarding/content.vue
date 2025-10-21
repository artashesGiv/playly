<template>
  <onboarding-v2-step-layout>
    <transition-fade>
      <component :is="componentMap[step]" :key="step" />
    </transition-fade>
  </onboarding-v2-step-layout>
</template>

<script setup lang="ts">
export type OnboardingContentProps = {
  step: OnboardingStep
}

defineProps<OnboardingContentProps>()
</script>

<style scoped lang="scss"></style>
