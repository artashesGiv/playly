<template>
  <div :class="`spinner spinner--size--${size}`">
    <ui-icon-base name="loader-2" />
  </div>
</template>

<script lang="ts" setup>
type SpinnerView = 'primary' | 'dark' | 'light'

export type SpinnerProps = {
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl' | '3xl'
  view?: SpinnerView
}

withDefaults(defineProps<SpinnerProps>(), {
  size: 's',
  view: 'primary',
})
</script>

<style scoped lang="scss">
.spinner {
  position: relative;
  border-radius: 100%;
  overflow: hidden;

  i {
    display: block;
    width: 100%;
    height: 100%;
    animation: rotate360 1s infinite linear;
  }

  &--size {
    &--s {
      font-size: 20px;
    }

    &--m {
      font-size: 36px;
    }

    &--l {
      font-size: 50px;
    }

    &--xl {
      font-size: 64px;
    }

    &--xxl {
      font-size: 100px;
    }

    &--3xl {
      font-size: 150px;
    }
  }
}
</style>
