<template>
  <div class="onboarding-step-2">
    <nuxt-img
      src="/images/onboarding/step-2.png"
      class="onboarding-step-2__image"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.onboarding-step-2 {
  position: relative;
  height: 100%;

  &__image {
    @include center('horizontal');

    bottom: 0;
    width: 345px;
  }
}
</style>
