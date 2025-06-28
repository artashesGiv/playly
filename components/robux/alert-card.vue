<template>
  <ui-card class="robux-alert">
    <span>{{ t('robux.alert') }}</span>
    <div class="robux-alert__right">
      <div class="robux-alert__prev-price">176</div>
      <div class="robux-alert__price">
        345
        <ui-icon-base name="robux" class="robux-alert__icon" />
      </div>
    </div>
  </ui-card>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped lang="scss">
.robux-alert {
  @include row(12px);

  justify-content: space-between;
  font: var(--font-base-medium);
  border-radius: 18px;

  &__right {
    @include row(8px);
  }

  &__prev-price {
    text-decoration: line-through;
  }

  &__price {
    @include row(8px);

    color: var(--white);
  }

  &__icon {
    font-size: 18px;
    color: var(--yellow-500);
  }
}
</style>
