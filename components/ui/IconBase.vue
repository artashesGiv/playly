<template>
  <i :class="classes" />
</template>

<script setup lang="ts">
export type IconBaseProps = {
  name: Icons
}

const props = defineProps<IconBaseProps>()
const attrs = useAttrs()

const classes = computed(() => [
  'icon-base',
  `icon-${props.name}`,
  { 'icon-base--interactive': !!attrs.onClick },
])
</script>

<style lang="scss">
.icon-base {
  display: inline-block;
  font-weight: 400;
  font-size: 20px;

  &::before {
    font-family: icon, sans-serif;
    display: block;
    font-size: inherit;
    color: inherit;
    line-height: 1;
  }

  &--interactive {
    cursor: pointer;
  }
}
</style>
