<template>
  <motion.div
    :while-press="isTap ? { scale: 0.9 } : undefined"
    :class="classes"
    :style="style"
    @click="emits('click')"
  >
    <div v-if="isTap" class="tap-banner">{{ $t('common.tap') }}</div>
    <Lottie v-if="isTap" link="/lottie/coin.json" autoplay loop />
    <nuxt-img v-else :src="src" />
  </motion.div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

// type
type Size = 'xs' | 's' | 'm' | 'l' | '3xl'

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
  'l': 54,
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
  position: relative;
  user-select: none;

  &.is-tap {
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .tap-banner {
    @include row;

    position: absolute;
    top: 7px;
    left: -22px;
    font: var(--font-small-bold);
    height: 36px;
    padding: 0 12px;
    border-radius: 13px;
    background-color: var(--white);
    color: var(--dark-1000);
    z-index: 2;
  }
}
</style>
