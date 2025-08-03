<template>
  <div :class="classes" :style="style">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
export type TagProps = {
  text: string
  color?:
    | 'pink'
    | 'green'
    | 'blue'
    | 'yellow'
    | 'light'
    | 'red'
    | 'dark'
    | 'marine'
    | 'purple'
    | 'sky-blue'
  view?: 'base' | 'secondary'
  size?: 's' | 'm' | 'l'
}

const props = withDefaults(defineProps<TagProps>(), {
  color: 'blue',
  size: 'm',
  view: 'base',
})

const classes = computed(() => [
  'tag',
  `tag--color--${props.color}`,
  `tag--view--${props.view}`,
  `tag--size--${props.size}`,
])

const style = computed(() => {
  if (props.view === 'secondary') {
    return {
      color: `var(--${props.color}-500)`,
      backgroundColor: `var(--${props.color}-alpha)`,
    }
  }

  return {}
})
</script>

<style scoped lang="scss">
.tag {
  @include row;

  position: relative;
  z-index: 0;
  color: var(--white);
  display: inline-flex;

  &--size {
    &--l {
      font: var(--font-normal-semibold);
      padding: 0 16px;
      height: 39px;
      border-radius: 10px;
    }
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

  &--color {
    &--pink {
      background-color: var(--pink-500);
    }
    &--green {
      background-color: var(--green-500);
    }
    &--yellow {
      background-color: var(--yellow-500);
    }
    &--light {
      background-color: var(--light-500);
    }
    &--red {
      background-color: var(--red-500);
    }
    &--dark {
      background-color: var(--dark-500);
      color: var(--light-600);
    }
    &--blue {
      background-color: var(--primary-500);
    }
    &--marine {
      background-color: #42a58d;
    }
    &--purple {
      background-color: #7e10d4;
    }
    &--sky-blue {
      background-color: #00d4ff;
    }
  }
}
</style>
