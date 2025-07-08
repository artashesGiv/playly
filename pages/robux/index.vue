<template>
  <div class="robux">
    <div class="robux__content">
      <robux-main-card />
      <ui-button-base text="success" @click="navigateTo('/robux/buy?step=6')" />
      <ui-button-base
        text="failed"
        view="secondary"
        @click="navigateTo('/robux/buy?step=5&error=true')"
      />
      <ui-divider />
      <div class="robux__inputs">
        <ui-input-base
          v-model="getValue"
          :label="$t('robux.input.labelReceived')"
          icon="robux"
          icon-color="yellow"
          type="number"
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
        :text="$t('common.buy', { sum: `${getValue} R$` })"
        :is-disabled="!+getValue"
        size="52"
        icon-right="right-1"
        @click="navigateTo('/robux/buy?step=1')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

const { getValue, payValue } = storeToRefs(useRobuxBuyStore())
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
