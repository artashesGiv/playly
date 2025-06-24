<template>
  <nuxt-img :src="src" :style="style" />
</template>

<script setup lang="ts">
// type
import type { CSSProperties } from 'vue'

type Size = 'xs' | 's' | 'm' | '3xl'

export type MainMascotProps = {
  size?: Size
  isTap?: boolean
}

// define
const props = withDefaults(defineProps<MainMascotProps>(), {
  size: 's',
  isTap: false,
})

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
  height: `${realSize.value}px`,
}))
</script>

<style scoped lang="scss"></style>
