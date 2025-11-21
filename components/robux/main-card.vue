<template>
  <div class="gamepass-main-card">
    <h4 class="title">{{ $t('robux.title') }}</h4>
    <span class="description">{{ $t('robux.description') }}</span>
    <nuxt-img
      class="gamepass-main-card__image gamepass-main-card__image-1"
      src="/images/main/robux.png"
    />
    <nuxt-img
      class="gamepass-main-card__image gamepass-main-card__image-2"
      src="/images/main/robux.png"
    />
    <ui-icon-base
      class="gamepass-main-card__icon gamepass-main-card__icon-1"
      name="robux"
    />
    <ui-icon-base
      class="gamepass-main-card__icon gamepass-main-card__icon-2"
      name="robux"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.gamepass-main-card {
  @include column(2px);

  position: relative;
  padding: 66px 14px 14px;
  background: var(--primary-gradient);
  border-radius: 22px;
  overflow: hidden;
  min-height: 130px;

  h4 {
    position: relative;
    z-index: 2;
  }

  span {
    position: relative;
    z-index: 2;
    color: var(--white);
  }

  &__image {
    position: absolute;

    &-1 {
      top: -21px;
      right: 102px;
      width: 70px;
      height: 70px;
    }

    &-2 {
      top: 7px;
      right: -39px;
      width: 110px;
      height: 110px;
    }
  }

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
      bottom: -42px;
      right: 82px;
      font-size: 70px;
    }
  }
}
</style>
