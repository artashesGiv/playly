<template>
  <div class="onboarding">
    <main-logo />
    <onboarding-content :step="activeStep" class="onboarding__content" />
    <div class="onboarding__information">
      <ui-step-point :steps="3" :active-step="activeStep" />
      <div class="onboarding__text">
        <h2>{{ textMap[activeStep].title }}</h2>
        <span>{{ textMap[activeStep].description }}</span>
      </div>
    </div>

    <ui-button-base
      :text="$t('onboarding.button')"
      size="52"
      class="onboarding__button"
      @click="onNextStep"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})

const activeStep = ref<OnboardingStep>(1)

const { t } = useI18n()

const textMap: Record<OnboardingStep, { title: string; description: string }> =
  {
    '1': {
      title: t('onboarding.step-1.title'),
      description: t('onboarding.step-1.description'),
    },
    '2': {
      title: t('onboarding.step-2.title'),
      description: t('onboarding.step-2.description'),
    },
    '3': {
      title: t('onboarding.step-3.title'),
      description: t('onboarding.step-3.description'),
    },
  }

const onNextStep = () => {
  if (activeStep.value + 1 <= 3) {
    activeStep.value += 1
  } else {
    navigateTo('/')
  }
}
</script>

<style scoped lang="scss">
.onboarding {
  @include column(40px);

  align-items: center;
  height: 100%;
  overflow: auto;
  padding: 18px 0;

  &__content {
    width: 100%;
  }

  &__information {
    @include column(14px);

    align-items: center;
  }

  &__text {
    @include column(8px);

    text-align: center;

    h2 {
      font: var(--font-very-large-semibold);
      color: var(--white);
    }

    span {
      font: var(--font-large-medium);
      color: var(--light-500);
    }
  }

  &__button {
    margin-top: auto;
    flex-shrink: 0;
  }
}
</style>
