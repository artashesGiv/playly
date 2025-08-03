<template>
  <div class="cases-main-card">
    <ui-icon-base
      name="robux"
      class="cases-main-card__icon cases-main-card__icon-1"
    />
    <ui-icon-base
      name="robux"
      class="cases-main-card__icon cases-main-card__icon-2"
    />
    <nuxt-img
      src="/images/cases/main.png"
      class="cases-main-card__image cases-main-card__image-bg"
    />
    <nuxt-img
      src="/images/main/robux.png"
      class="cases-main-card__image cases-main-card__image-robux"
    />
    <div class="cases-main-card__text">
      <h4 class="title">{{ $t('cases.title') }}</h4>
      <span class="description">{{ $t('cases.description') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.cases-main-card {
  position: relative;
  padding: 14px;
  min-height: 130px;
  background-color: var(--primary-500);
  border-radius: 22px;
  overflow: hidden;

  &__icon {
    position: absolute;
    color: var(--white);
    opacity: 0.3;

    &-1 {
      top: 5px;
      left: 14px;
      font-size: 56px;
    }
    &-2 {
      top: 26px;
      left: 124px;
      font-size: 44px;
    }
  }

  &__image {
    position: absolute;

    &-robux {
      top: -30px;
      left: 50%;
      width: 70px;
      height: 70px;
    }

    &-bg {
      top: -30px;
      right: -30px;
      width: 187px;
      height: 187px;
    }
  }

  &__text {
    @include column(2px);

    position: absolute;
    z-index: 2;
    max-width: 62%;
    bottom: 14px;
    left: 14px;
  }

  .description {
    color: var(--white);
  }
}
</style>
