<template>
  <div class="onboarding-step-layout">
    <nuxt-img
      src="/images/onboarding/decor.png"
      class="onboarding-step-layout__image onboarding-step-layout__image-1"
    />
    <nuxt-img
      src="/images/onboarding/decor.png"
      class="onboarding-step-layout__image onboarding-step-layout__image-2"
    />
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.onboarding-step-layout {
  position: relative;
  border-radius: 32px;
  height: 390px;
  background-color: var(--primary-500);
  overflow: hidden;

  &__image {
    position: absolute;
    width: 225px;

    &-1 {
      top: 158px;
      left: -90px;
      transform: rotate(-16.3deg);
    }

    &-2 {
      top: 14px;
      right: -74px;
      transform: rotate(9.8deg);
    }
  }
}
</style>
