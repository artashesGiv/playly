<template>
  <article class="banner" @click="navigateTo('/robux')">
    <div class="banner__left">
      <span>{{ $t('coins.banner.title') }}</span>
      <span>100R = {{ 100 * (rates?.rub2robux || 1) }}R$</span>
    </div>
    <ui-icon-base
      v-for="item in 2"
      :key="item"
      name="mascot"
      class="banner__icon"
      :class="`banner__icon--${item}`"
    />
    <nuxt-img src="/images/main/robux.png" class="banner__robux" />
    <ui-button-base
      :text="width >= 500 ? $t('coins.banner.button') : ''"
      max-content
      icon-right="right-1"
      size="42"
      view="white"
      @click="navigateTo('/robux')"
    />
  </article>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'

const { rates } = storeToRefs(useAuthStore())

const width = ref(window.innerWidth)

const handleResize = () => {
  width.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss">
.banner {
  @include row;

  position: relative;
  justify-content: space-between;
  padding: 14px;
  border-radius: 22px;
  background-color: var(--green-600);
  color: var(--white);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    );
    animation: shine 3s infinite;
  }

  &__icon {
    position: absolute;
    font-size: 30px;
    color: var(--white);
    opacity: 0.6;

    @media (min-height: 360px) {
      font-size: 50px;
    }

    &--1 {
      top: -12px;
      left: 160px;

      @media (min-height: 360px) {
        top: -22px;
        left: 152px;
      }
    }
    &--2 {
      left: 220px;
      bottom: -7px;

      @media (min-height: 360px) {
        bottom: -15px;
        left: 262px;
      }
    }
  }

  &__robux {
    @include center('vertical');

    width: 38px;
    left: 185px;

    @media (min-height: 360px) {
      width: 67px;
      left: 190px;
    }
  }

  &__left {
    @include column;

    span:first-child {
      font: var(--font-large-semibold);
    }

    span:last-child {
      font: var(--font-normal-medium);
    }
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
