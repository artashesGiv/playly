<template>
  <div class="step-2 container">
    <div class="step-2__cases">
      <cases-card
        v-for="item in testCases"
        :key="item.id"
        actual-price="0"
        v-bind="item"
        class="step-2__case"
        is-background
        @click="emit('next-step', item.id)"
      />
    </div>
    <div class="step-2__text">
      <h2>{{ $t('onboarding-v2.step-2.title') }}</h2>
      <span>{{ $t('onboarding-v2.step-2.description') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCasesStore } from '@/store'

const emit = defineEmits(['next-step'])

const { casesOnboarding } = useCasesStore()
const testCases = computed(() =>
  casesOnboarding.filter(item => item.price === 500),
)
</script>

<style scoped lang="scss">
.step-2 {
  @include column(42px);

  min-height: 100%;
  justify-content: center;
  padding-top: 16px;
  padding-bottom: 16px;

  &__cases {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  &__case {
    height: 250px;
  }

  &__text {
    @include column(6px);

    align-items: center;
    text-align: center;

    h2 {
      font: var(--font-large-semibold);
      color: var(--white);
    }

    span {
      font: var(--font-large-medium);
      color: var(--light-500);
    }
  }
}
</style>
