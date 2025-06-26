<template>
  <ui-card class="star-pets">
    <div class="star-pets__left">
      <h4>StarPets ID</h4>
      <span>Items are sent via StarPets</span>
    </div>
    <ui-button-base size="42" text="Link" max-content />
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

    h4 {
      font: var(--font-large-semibold);
      color: var(--white);
    }

    span {
      font: var(--font-normal-medium);
    }
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
