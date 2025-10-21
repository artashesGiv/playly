<template>
  <div class="step-5 container">
    <div class="step-5__cards">
      <div v-for="item in 3" :key="item" class="step-5__card">
        <nuxt-img
          v-for="decor in 2"
          :key="decor"
          src="/images/onboarding-v2/decor.png"
          :class="['step-5__decor', `step-5__decor-${decor}`]"
        />
        <nuxt-img
          :src="`/images/onboarding-v2/step-${item}.png`"
          :class="['step-5__image', `step-5__image-${item}`]"
        />
        <div class="step-5__text">
          <h2>{{ $t(`onboarding-v2.step-5.card-${item}.title`) }}</h2>
        </div>
      </div>
      <span class="step-5__description">
        {{ $t('onboarding-v2.step-5.description') }}
      </span>
    </div>
    <div class="step-5__buttons">
      <ui-button-base
        size="52"
        :text="$t('onboarding-v2.step-5.min_button')"
        @click="onContinue"
      />
      <ui-button-base
        size="52"
        view="secondary"
        :text="$t('onboarding-v2.step-5.second_button')"
        @click="navigateTo('/')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const onContinue = () => {
  navigateTo('/')
  useShareLink(t('invitation'))
}
</script>

<style scoped lang="scss">
.step-5 {
  @include column(42px);

  height: 100%;
  justify-content: center;
  padding-top: 16px;
  padding-bottom: 16px;
  overflow: hidden;

  &__cards {
    position: relative;
    height: 80%;
  }

  &__card {
    @include scroll-gradient(220px);

    height: 296px;
    width: 100%;
    background-color: var(--primary-500);
    transition: var(--transition-base);
    position: absolute;
    top: calc(100% - 296px);
    left: 0;
    opacity: 0;
    border-radius: 32px;
    overflow: hidden;

    & > * {
      position: relative;
      z-index: 2;
    }

    &::after {
      z-index: 4;
    }

    &::before {
      content: '';
      @include center('stretch');
      background: linear-gradient(
        180deg,
        rgba(25, 24, 27, 0.7) 0.01%,
        #19181b 100%
      );
      z-index: 3;
      opacity: 0;
    }

    &:nth-child(1) {
      animation: card-1 4s forwards;
      animation-delay: 0s;

      &::before {
        animation: fade 1s forwards;
        animation-delay: 3s;
      }
    }

    &:nth-child(2) {
      animation: card-2 4s forwards;
      animation-delay: 4s;

      &::before {
        animation: fade 1s forwards;
        animation-delay: 7s;
      }
    }

    &:nth-child(3) {
      animation: card-3 4s forwards;
      animation-delay: 8s;
    }
  }

  &__image {
    @include center('horizontal');

    z-index: 4;

    &-1 {
      top: 30px;
      width: 224px;
    }

    &-2 {
      top: 13px;
      width: 252px;
    }

    &-3 {
      top: 0;
      width: 273px;
    }
  }

  &__description {
    position: absolute;
    bottom: 0;
    left: 0;
    font: var(--font-large-medium);
    text-align: center;
    opacity: 0;
    animation: fade 0.3s forwards;
    animation-delay: 14s;
  }

  &__text {
    @include column(6px);

    @include center('horizontal');

    width: 80%;
    bottom: 14px;
    align-items: center;
    text-align: center;
    z-index: 5;

    h2 {
      font: var(--font-large-semibold);
      color: var(--white);
    }
  }

  &__buttons {
    @include column(12px);

    opacity: 0;
    animation: fade 0.3s forwards;
    animation-delay: 14s;
  }

  &__decor {
    position: absolute;
    width: 225px;

    &-1 {
      top: 120px;
      left: -90px;
      transform: rotate(-16.3deg);
    }

    &-2 {
      top: 20px;
      right: -74px;
      transform: rotate(9.8deg);
    }
  }
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes card-1 {
  0% {
    opacity: 0;
    top: calc(100% - 296px);
    scale: 1;
  }
  5% {
    opacity: 1;
    top: calc(100% - 296px);
    scale: 1;
  }
  20% {
    opacity: 1;
    top: calc(100% - 296px);
    scale: 1;
  }
  80% {
    opacity: 1;
    top: calc(100% - 296px);
    scale: 1;
  }
  100% {
    opacity: 1;
    top: -35px;
    scale: 0.75;
  }
}
@keyframes card-2 {
  0% {
    opacity: 0;
    top: calc(100% - 296px);
    scale: 1;
  }
  20% {
    opacity: 1;
    top: calc(100% - 296px);
    scale: 1;
  }
  80% {
    opacity: 1;
    top: calc(100% - 296px);
    scale: 1;
  }
  100% {
    opacity: 1;
    top: 0;
    scale: 0.85;
  }
}
@keyframes card-3 {
  0% {
    opacity: 0;
    top: calc(100% - 296px);
    scale: 1;
  }
  20% {
    opacity: 1;
    top: calc(100% - 296px);
    scale: 1;
  }
  80% {
    opacity: 1;
    top: calc(100% - 296px);
    scale: 1;
  }
  100% {
    opacity: 1;
    top: 50px;
  }
}
</style>
