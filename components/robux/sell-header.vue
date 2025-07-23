<template>
  <div class="sp-link-header">
    <div class="sp-link-header__left">
      <ui-icon-base name="robux" />
    </div>
    <ui-icon-base name="refresh-2" class="sp-link-header__icon" />
    <div class="sp-link-header__right">
      <main-mascot size="l" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.sp-link-header {
  @include row(18px);
  justify-content: center;

  &__icon {
    font-size: 24px;
  }

  &__left,
  &__right {
    @include row;

    width: 102px;
    height: 102px;
    border-radius: 50%;
    justify-content: center;
    background-color: var(--light-1000);

    i {
      font-size: 54px;
    }
  }
}
</style>
