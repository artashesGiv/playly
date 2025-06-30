<template>
  <div class="sp-content">
    <div class="sp-content__text">
      <h2 class="title">{{ $t('starPetsLink.title') }}</h2>
      <span class="description">{{ $t('starPetsLink.description') }}</span>
    </div>
    <ui-input-base
      model-value=""
      :placeholder="$t('starPetsLink.placeholder')"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.sp-content {
  @include column(18px);

  text-align: center;

  &__text {
    @include column(2px);

    .description {
      font: var(--font-base-medium);
    }
  }
}
</style>
