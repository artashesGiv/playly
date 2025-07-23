<template>
  <div class="onboarding-step-3">
    <nuxt-img
      src="/images/onboarding/step-3.png"
      class="onboarding-step-3__image"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.onboarding-step-3 {
  position: relative;
  height: 100%;

  &__image {
    @include center('horizontal');

    top: 0;
    width: 338px;
  }
}
</style>
