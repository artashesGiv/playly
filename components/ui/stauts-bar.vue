<template>
  <div class="status-bar" :class="classes">
    <div class="status-bar__progress" :style="{ width: `${progressWidth}%` }" />
    <div
      class="status-bar__progress-next"
      :style="{ width: `${progressNextWidth}%` }"
    />
  </div>
</template>

<script setup lang="ts">
export type StatusBarProps = {
  progress: number
  min?: number
  max?: number
  isShowSuccess?: boolean
  errorLimit?: number
  nextStep?: number
}

const props = withDefaults(defineProps<StatusBarProps>(), {
  min: 0,
  max: 100,
  errorLimit: undefined,
  nextStep: 1,
})

const progressWidth = computed(() => {
  const { progress, min, max } = props
  const range = max - min
  if (range <= 0) return 0

  return (100 / max) * progress
})

const progressNextWidth = computed(() => {
  const { progress, min, max } = props
  const range = max - min
  if (range <= 0) return 0

  if (progress >= max) return 0

  return (100 / max) * (progress + props.nextStep)
})

const isFilled = computed(() => {
  const { progress, max } = props
  return progress >= max
})

const classes = computed(() => [
  {
    'is-success': props.isShowSuccess && isFilled.value,
    'is-error': props.errorLimit && props.progress >= props.errorLimit,
  },
])
</script>

<style scoped lang="scss">
.status-bar {
  position: relative;
  width: 100%;
  height: 6px;
  border-radius: 1000px;
  background-color: var(--dark-900);
  overflow: hidden;

  &__progress,
  &__progress-next {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 1000px;
    background-color: var(--blue-500);
    transition: var(--transition-base);
  }

  &__progress {
    z-index: 2;
  }

  &__progress-next {
    width: 100px;
    opacity: 0.3;
    z-index: 1;
  }

  .is-success &__progress {
    background-color: var(--green-500);
  }

  .is-error &__progress {
    background-color: var(--red-500);
  }
}
</style>
