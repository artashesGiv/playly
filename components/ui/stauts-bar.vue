<template>
  <div class="status-bar">
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
}

const props = withDefaults(defineProps<StatusBarProps>(), {
  min: 0,
  max: 100,
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

  return (100 / max) * (progress + 1)
})
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

  &__progress-next {
    width: 100px;
    opacity: 0.3;
  }
}
</style>
