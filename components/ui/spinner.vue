<template>
  <div :class="classes">
    <ui-icon-base name="loader-2" />
  </div>
</template>

<script lang="ts" setup>
type SpinnerView = 'primary' | 'dark' | 'light'

export type SpinnerProps = {
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl' | '3xl'
  view?: SpinnerView
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 's',
  view: 'light',
})

const classes = computed(() => [
  'spinner',
  `spinner--size--${props.size}`,
  `spinner--view--${props.view}`,
])
</script>

<style scoped lang="scss">
.spinner {
  display: flex;

  &--view {
    &--primary {
      color: var(--primary-600);
    }

    &--dark {
      color: var(--dark-600);
    }
  }

  i {
    animation: rotate360 1s infinite linear;
  }

  &--size {
    &--s {
      i {
        font-size: 20px;
      }
    }

    &--m {
      i {
        font-size: 36px;
      }
    }

    &--l {
      i {
        font-size: 50px;
      }
    }

    &--xl {
      i {
        font-size: 64px;
      }
    }

    &--xxl {
      i {
        font-size: 100px;
      }
    }

    &--3xl {
      i {
        font-size: 150px;
      }
    }
  }
}
</style>
