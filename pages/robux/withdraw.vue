<template>
  <div class="withdraw">
    <item-main-data
      :title="$t('common.r$', robuxBalance)"
      :description="$t('robux.balance.description')"
      image="/images/main/robux.png"
    />
    <div class="withdraw__content">
      <ui-table-data :list="dataList">
        <template #row-1>
          <user-data />
        </template>
        <template #row-2="{ value }">
          <div class="withdraw__price">
            <span>{{ value }}</span>
            <ui-icon-base name="robux" />
          </div>
        </template>
      </ui-table-data>
      <ui-divider />
      <div class="withdraw__inputs">
        <ui-input-base
          v-model="value"
          icon-color="yellow"
          :label="$t('common.r$Amount')"
          icon="robux"
          type="number"
        />
      </div>
      <ui-divider />
      <div class="withdraw__buttons">
        <ui-button-base
          view="secondary"
          text="150 R$"
          size="46"
          @click="value = 150"
        />
        <ui-button-base
          view="secondary"
          text="300 R$"
          size="46"
          @click="value = 300"
        />
        <ui-button-base
          view="secondary"
          text="500 R$"
          size="46"
          @click="value = 500"
        />
      </div>
      <span class="description">
        {{ $t('robux.withdraw.text') }}
      </span>
    </div>
    <ui-button-base
      icon="robux"
      :text="$t('common.withdrawCoins', +value ? +value : 0)"
      :is-disabled="!value"
      size="52"
      @click="onWithdraw"
    />
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore, useUserStore } from '@/store'
import type { TableDataProps } from '@/components/ui/table-data.vue'

definePageMeta({
  layout: 'empty',
})

useBackButton()

const { t } = useI18n()
const { user, popup } = useTelegram()
const { robuxBalance } = storeToRefs(useUserStore())
const { getValue } = storeToRefs(useRobuxBuyStore())
const value = ref(0)

const dataList = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: user,
  },
  {
    title: t('robux.minimumWithdraw'),
    value: t('common.r$', 2),
  },
])

const onWithdraw = () => {
  const isMinRobux = value.value >= 2
  const isCanWithdraw = robuxBalance.value >= value.value

  if (isMinRobux && isCanWithdraw) {
    getValue.value = value.value
    navigateTo('/robux/buy?isWithdraw=true')
  } else if (!isCanWithdraw) {
    popup.showAlert('Недостаточно R$')
  } else if (!isMinRobux) {
    popup.showAlert('Минимально для вывода 2 R$')
  }
}
</script>

<style scoped lang="scss">
.withdraw {
  @include column(18px);

  padding: 18px 0;

  .description {
    text-align: left;
    font: var(--font-base-medium);
  }

  &__content {
    @include column(18px);

    //flex-grow: 1;
    //overflow-y: auto;
  }

  &__price {
    @include row(8px);

    color: var(--white);

    i {
      color: var(--yellow-500);
      font-size: 22px;
    }
  }

  &__inputs {
    @include column(12px);
  }

  &__buttons {
    @include row(8px);
  }
}
</style>
