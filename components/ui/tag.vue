<template>
  <div :class="classes">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
export type TagProps = {
  text: string
  view?: 'pink' | 'green' | 'primary' | 'yellow' | 'light' | 'red' | 'dark'
  size?: 's' | 'm'
}

const props = withDefaults(defineProps<TagProps>(), {
  view: 'primary',
  size: 'm',
})

const classes = computed(() => [
  'tag',
  `tag--view--${props.view}`,
  `tag--size--${props.size}`,
])
</script>

<style scoped lang="scss">
.tag {
  @include row;

  display: inline-flex;

  &--size {
    &--m {
      font: var(--font-small-bold);
      padding: 0 10px;
      height: 24px;
      border-radius: 10px;
    }
    &--s {
      font: var(--font-tiny-bold);
      padding: 0 8px;
      height: 20px;
      border-radius: 8px;
    }
  }

  &--view {
    &--pink {
      background-color: var(--pink-500);
      color: var(--white);
    }
    &--green {
      background-color: var(--green-500);
      color: var(--white);
    }
    &--yellow {
      background-color: var(--yellow-500);
      color: var(--white);
    }
    &--light {
      background-color: var(--light-500);
      color: var(--white);
    }
    &--red {
      background-color: var(--red-500);
      color: var(--white);
    }
    &--dark {
      background-color: var(--dark-500);
      color: var(--light-600);
    }
    &--primary {
      background-color: var(--primary-500);
      color: var(--white);
    }
  }
}
</style>
