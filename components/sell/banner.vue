<template>
  <div class="sell-banner">
    <ui-icon-base
      v-for="item in 2"
      :key="item"
      name="robux"
      class="sell-banner__icon"
      :class="`sell-banner__icon--${item}`"
    />
    <nuxt-img
      v-for="item in 2"
      :key="item"
      src="/images/main/robux.png"
      class="sell-banner__image"
      :class="`sell-banner__image--${item}`"
    />
    <span class="title">{{ $t('sell.banner.title') }}</span>
    <span class="description">
      {{ $t('sell.banner.description') }}
    </span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.sell-banner {
  @include column;

  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background-color: var(--primary-600);
  padding: 14px;
  height: 130px;

  & > * {
    position: relative;
    z-index: 2;
  }

  span {
    color: var(--white);
  }

  &__icon {
    position: absolute;
    color: var(--white);
    opacity: 0.2;

    &--1 {
      font-size: 56px;
      top: 5px;
      left: 14px;
    }
    &--2 {
      font-size: 70px;
      bottom: -42px;
      right: 82px;
    }
  }

  &__image {
    position: absolute;

    &--1 {
      width: 70px;
      height: 70px;
      top: -23px;
      right: 86px;
    }
    &--2 {
      width: 110px;
      height: 110px;
      top: 1px;
      right: -55px;
    }
  }
}
</style>
