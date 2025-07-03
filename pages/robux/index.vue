<template>
  <div class="robux">
    <div class="robux__content">
      <robux-main-card />
      <ui-divider />
      <div class="robux__inputs">
        <ui-input-base
          v-model="getValue"
          :label="$t('robux.input.labelReceived')"
          icon="robux"
          icon-color="yellow"
        />
        <ui-input-base
          v-model="payValue"
          :label="$t('robux.input.labelPay')"
          icon="wallet"
          type="number"
        />
      </div>
      <ui-divider />
      <div class="robux__interactive">
        <div class="robux__buttons">
          <ui-button-base
            view="secondary"
            text="700 R$"
            size="46"
            @click="getValue = 700"
          />
          <ui-button-base
            view="secondary"
            text="1000 R$"
            size="46"
            @click="getValue = 1000"
          />
          <ui-button-base
            view="secondary"
            text="1500 R$"
            size="46"
            @click="getValue = 1500"
          />
        </div>
        <ui-input-base
          model-value=""
          :placeholder="$t('robux.input.promocodePlaceholder')"
          icon="ticket-2"
        />
      </div>
    </div>
    <div class="robux__footer">
      <robux-alert-card />
      <ui-button-base
        :text="$t('common.buy', { sum: '345 R$' })"
        size="52"
        icon-right="right-1"
        @click="navigateTo('/robux/buy')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const COEFFICIENT = 4

const getValue = ref(1000)
const payValue = ref(250)

watch(payValue, newVal => {
  const calculated = newVal * COEFFICIENT
  if (getValue.value !== calculated) {
    getValue.value = calculated
  }
})

watch(getValue, newVal => {
  const calculated = newVal / COEFFICIENT
  if (payValue.value !== calculated) {
    payValue.value = calculated
  }
})
</script>
<style scoped lang="scss">
.robux {
  @include column(12px);
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
