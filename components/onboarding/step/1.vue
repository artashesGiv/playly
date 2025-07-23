<template>
  <div class="onboarding-step-1">
    <nuxt-img
      src="/images/onboarding/step-1.png"
      class="onboarding-step-1__image"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.onboarding-step-1 {
  position: relative;
  height: 100%;

  &__image {
    @include center('horizontal');

    bottom: 0;
    width: 290px;
  }
}
</style>
