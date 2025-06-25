<template>
  <motion.div
    :while-press="{ scale: 0.9 }"
    :class="classes"
    :style="style"
    @click="emits('click')"
  >
    <nuxt-img :src="src" />
  </motion.div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

// type
type Size = 'xs' | 's' | 'm' | '3xl'

export type MainMascotProps = {
  size?: Size
  isTap?: boolean
}

type Emits = {
  (emit: 'click'): void
}
// define
const props = withDefaults(defineProps<MainMascotProps>(), {
  size: 's',
})
const emits = defineEmits<Emits>()

// data
const mapSize: Record<Size, number> = {
  'xs': 16,
  's': 22,
  'm': 32,
  '3xl': 166,
}

// computed
const src = computed(() => {
  if (props.isTap) {
    return '/images/main/mascot-tap.png'
  }

  return '/images/main/mascot.png'
})

const realSize = computed(() => mapSize[props.size])

const style = computed<CSSProperties>(() => ({
  width: `${realSize.value}px`,
  aspectRatio: props.isTap ? '1.137 / 1' : '1 / 1',
}))

const classes = computed(() => ['mascot', { 'is-tap': props.isTap }])
</script>

<style scoped lang="scss">
.mascot {
  user-select: none;

  &.is-tap {
    cursor: pointer;
  }
}
</style>
