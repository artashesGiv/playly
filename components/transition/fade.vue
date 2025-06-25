<template>
  <transition name="fade" :mode="mode">
    <slot />
  </transition>
</template>

<script setup lang="ts">
export type TransitionFadeProps = {
  mode?: 'in-out' | 'out-in'
}

withDefaults(defineProps<TransitionFadeProps>(), {
  mode: 'out-in',
})
</script>

<style scoped lang="scss"></style>
