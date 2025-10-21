<template>
  <article
    class="card"
    :class="[{ 'is-error': isError }, `card--view--${view}`]"
  >
    <transition-fade>
      <ui-icon-base v-if="isError" name="alert" class="card__error-icon" />
    </transition-fade>
    <slot />
  </article>
</template>

<script setup lang="ts">
export type CardProps = {
  isError?: boolean
  view?: 'light' | 'dark'
}

withDefaults(defineProps<CardProps>(), {
  isError: false,
  view: 'dark',
})
</script>

<style scoped lang="scss">
.card {
  padding: 14px;

  border-radius: 22px;
  position: relative;
  transition: var(--transition-base);
  border: 1px solid transparent;

  &__error-icon {
    position: absolute;
    right: 12px;
    top: 12px;
    color: var(--red-500);
  }

  &--view {
    &--light {
      background-color: var(--dark-700);
    }

    &--dark {
      background-color: var(--dark-900);
    }
  }

  &.is-error {
    border-color: var(--red-500);
  }
}
</style>
