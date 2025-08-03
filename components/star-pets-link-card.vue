<template>
  <ui-card class="star-pets">
    <div class="star-pets__left">
      <h4 class="title">StarPets ID</h4>
      <span class="description">
        {{ $t('profile.starPets.link.description') }}
      </span>
    </div>
    <ui-button-base
      size="42"
      :text="$t('common.link')"
      max-content
      @click="navigateTo('/star-pets-link')"
    />
    <ui-icon-base name="sp-logo" class="star-pets__icon star-pets__icon-1" />
    <ui-icon-base name="sp-logo" class="star-pets__icon star-pets__icon-2" />
  </ui-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.star-pets {
  @include row(12px);

  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &__left {
    @include column;
  }

  &__icon {
    position: absolute;
    color: var(--dark-500);

    &-1 {
      font-size: 58px;
      top: -20px;
      left: 50%;
    }

    &-2 {
      font-size: 46px;
      bottom: -10px;
      right: 30%;
    }
  }
}
</style>
