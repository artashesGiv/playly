<template>
  <div class="sell-banner">
    <ui-icon-base
      v-for="item in 2"
      :key="item"
      name="robux"
      class="sell-banner__icon"
      :class="`sell-banner__icon--${item}`"
    />
    <nuxt-img src="/images/sell/banner/bg.png" class="sell-banner__image" />
    <span class="title">{{ $t('sell.banner.title') }}</span>
    <span class="description">
      {{ $t('sell.banner.description') }}
    </span>
    <ui-button-base
      :text="$t('sell.banner.how_it_work_button')"
      size="44"
      view="white"
      class="sell-banner__button"
      @click="$emit('click-how-it-work')"
    />
  </div>
</template>

<script setup lang="ts">
type Emit = {
  (e: 'click-how-it-work'): void
}

defineEmits<Emit>()
</script>

<style scoped lang="scss">
.sell-banner {
  @include column;

  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background-color: var(--primary-600);
  padding: 14px;
  height: 190px;

  & > * {
    position: relative;
    z-index: 2;
  }

  span {
    color: var(--white);
    text-align: center;
  }

  &__icon {
    position: absolute;
    color: var(--white);
    opacity: 0.2;
    font-size: 66px;
    top: 38px;

    &--1 {
      left: -25px;
    }
    &--2 {
      right: -25px;
    }
  }

  &__image {
    @include center('horizontal');

    top: 0;
    width: 282px;
  }

  &__button {
    margin-top: 12px;
  }
}
</style>
