<template>
  <div class="robux">
    <div class="robux__content">
      <robux-main-card />
      <ui-divider />
      <div class="robux__info">
        <ui-tag
          size="l"
          color="blue"
          :text="$t('common.in_stock', { value: `${formatePrice(stock)} R$` })"
          view="secondary"
        />
        <ui-tag
          size="l"
          color="green"
          :text="`1₽ = ${rates?.rub2robux} R$`"
          view="secondary"
        />
      </div>
      <div class="robux__inputs">
        <ui-input-base
          v-model="getValue"
          :label="$t('robux.input.labelReceived')"
          postfix="R$"
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
      </div>
    </div>
    <div class="robux__footer">
      <robux-alert-card />
      <ui-button-base
        :text="$t('common.buy', { sum: `${getValue} R$` })"
        :is-disabled="!+getValue"
        size="52"
        icon-right="right-1"
        @click="onClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, useRobuxBuyStore } from '@/store'

const { getValue, payValue, stock } = storeToRefs(useRobuxBuyStore())
const { rates } = storeToRefs(useAuthStore())
const { fetchStock } = useRobuxBuyStore()
const { popup } = useTelegram()

const onClick = () => {
  const MIN_RUB_ORDER = 10

  const pay = Number(payValue.value) || 0
  const want = Number(getValue.value) || 0
  const available = Number(stock.value) || 0

  if (pay < MIN_RUB_ORDER) {
    popup.showAlert(`Нельзя сделать покупку меньше чем на ${MIN_RUB_ORDER}₽`)
    return
  }

  if (want > available) {
    popup.showAlert('Пока нет Robux в наличии, возвращайтесь позже')
    return
  }

  navigateTo('/robux/buy?step=1')
}

useBackButton()

onMounted(async () => {
  await fetchStock()
})
</script>
<style scoped lang="scss">
.robux {
  @include column(12px);
  height: 100%;

  &__content {
    @include column(12px);
    flex-grow: 1;
  }

  &__info {
    @include row(10px);
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
