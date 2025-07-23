<template>
  <div :class="classes">
    <div class="divider__line" />
  </div>
</template>

<script setup lang="ts">
export type DividerProps = {
  view?: 'light' | 'dark'
}

const props = withDefaults(defineProps<DividerProps>(), {
  view: 'dark',
})

const classes = computed(() => ['divider', `divider--view--${props.view}`])
</script>

<style scoped lang="scss">
.divider {
  width: 100%;

  &__line {
    width: 100%;
    height: 1px;
  }

  &--view {
    &--dark {
      background-color: var(--dark-900);
    }
    &--light {
      background-color: var(--dark-600);
    }
  }
}
</style>
