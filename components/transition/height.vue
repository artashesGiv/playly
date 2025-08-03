<template>
  <transition
    name="fade"
    class="transition"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script setup lang="ts">
const beforeEnter = (element: HTMLElement) => {
  element.style.height = '0px'
  element.style.overflow = 'hidden'
}

const enter = (element: HTMLElement) => {
  element.style.height = `${element.scrollHeight}px`
}

const afterEnter = (element: HTMLElement) => {
  element.style.height = `auto`
}

const beforeLeave = (element: HTMLElement) => {
  element.style.height = `${element.scrollHeight}px`
}

const leave = (element: HTMLElement) => {
  element.style.height = '0px'
}
</script>

<style scoped lang="scss">
.transition {
  transition: var(--transition-base);
  transition-property: height;
}
</style>
