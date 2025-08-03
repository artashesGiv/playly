<template>
  <ui-card class="access-write-banner">
    <ui-icon-base
      v-for="item in 3"
      :key="item"
      name="message-22"
      :class="[
        'access-write-banner__icon',
        `access-write-banner__icon--${item}`,
      ]"
    />

    <span class="title">{{ $t('market.access_write_banner.title') }}</span>
    <span class="description">
      {{ $t('market.access_write_banner.description') }}
    </span>
    <ui-button-base
      class="access-write-banner__button"
      :text="$t('market.access_write_banner.button')"
      size="42"
      @click="tg.requestWriteAccess"
    />
  </ui-card>
</template>

<script setup lang="ts">
const { tg } = useTelegram()
</script>

<style scoped lang="scss">
.access-write-banner {
  @include column;

  position: relative;
  overflow: hidden;

  & > * {
    position: relative;
    z-index: 2;
  }

  &__icon {
    position: absolute;
    color: var(--dark-600);

    &--1 {
      font-size: 52px;
      top: -12px;
      right: 53px;
    }
    &--2 {
      font-size: 21px;
      top: 3px;
      right: 14px;
    }
    &--3 {
      font-size: 31px;
      top: 32px;
      right: -7px;
    }
  }

  &__button {
    margin-top: 12px;
  }
}
</style>
