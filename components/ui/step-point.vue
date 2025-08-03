<template>
  <div class="step-point">
    <div
      v-for="item in steps"
      :key="item"
      class="step-point__item"
      :class="getItemClasses(item)"
    />
  </div>
</template>

<script setup lang="ts">
export type StepPointProps = {
  steps: number
  activeStep: number
}

const props = defineProps<StepPointProps>()

const localActiveStep = computed(() => {
  if (props.activeStep < 1) return 1
  if (props.activeStep > props.steps) return props.steps

  return props.activeStep
})

const getItemClasses = (item: number) => [
  { 'step-point__item--active': item === localActiveStep.value },
  { 'step-point__item--passed': item < localActiveStep.value },
]
</script>

<style scoped lang="scss">
.step-point {
  @include row(8px);

  &__item {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: var(--dark-400);
    transition: var(--transition-base);

    &--active {
      width: 26px;
      border-radius: 1000px;
    }

    &--active,
    &--passed {
      background-color: var(--primary-500);
    }
  }
}
</style>
