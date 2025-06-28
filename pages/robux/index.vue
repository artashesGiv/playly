<template>
  <div class="robux">
    <div class="robux__content">
      <robux-main-card />
      <ui-divider />
      <div class="robux__inputs">
        <ui-input-base
          :label="t('robux.input.labelPay')"
          model-value="56"
          icon="wallet"
        />
        <ui-input-base
          :label="t('robux.input.labelReceived')"
          model-value="56"
          icon="robux"
          icon-color="yellow"
        />
      </div>
      <ui-divider />
      <div class="robux__interactive">
        <div class="robux__buttons">
          <ui-button-base view="secondary" text="150 R$" size="46" />
          <ui-button-base view="secondary" text="300 R$" size="46" />
          <ui-button-base view="secondary" text="500 R$" size="46" />
        </div>
        <ui-input-base
          model-value=""
          :placeholder="t('robux.input.promocodePlaceholder')"
          icon="ticket-2"
        />
      </div>
    </div>
    <div class="robux__footer">
      <robux-alert-card />
      <ui-button-base
        :text="t('common.buy', { sum: '345 R$' })"
        size="52"
        icon-right="right-1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
<style scoped lang="scss">
.robux {
  @include column;
  height: 100%;

  &__content {
    @include column(18px);
    flex-grow: 1;
  }
  &__inputs,
  &__interactive {
    @include column(12px);
  }

  &__buttons {
    @include row(8px);
  }

  &__footer {
    @include column(12px);
  }
}
</style>
