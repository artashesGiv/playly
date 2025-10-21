<template>
  <div v-if="isInit" class="shop-v2-step-4">
    <shop-v2-data-card :item="currentItem" :game="currentGame" />
    <ui-divider view="light" />
    <ui-table-data :list="dataListCommon">
      <template #row-1="{ value }">
        <nuxt-img
          :src="`/images/pay-cards/${value}.png`"
          class="shop-v2-step-4__pay-type"
        />
      </template>
      <template #row-2="{ value }">
        <user-data :name="value.name" :photo_url="value.avatar_url" />
      </template>
    </ui-table-data>
    <ui-table-data :list="dataListPayment" />
  </div>
</template>

<script setup lang="ts">
import type { TableDataProps } from '@/components/ui/table-data.vue'
import { useShopV2FlowStore } from '@/store'
import type { ShopV2Game, ShopV2Item } from '@/types'

const { t } = useI18n()

const { marketFlowData, commissionPercent } = storeToRefs(useShopV2FlowStore())
const { getSummaryPrice } = useShopV2FlowStore()
const currentItem = computed<ShopV2Item>(() => marketFlowData.value.item!)
const currentGame = computed<ShopV2Game>(() => marketFlowData.value.game!)

const isInit = computed(() => currentGame.value && currentItem.value)

const dataListCommon = computed<TableDataProps['list']>(() => [
  {
    title: t('market.steps.4.data.payment_method'),
    value: marketFlowData.value.activePayType,
  },
  {
    title: t('market.steps.4.data.account'),
    value: marketFlowData.value.user,
  },
])

const dataListPayment = computed<TableDataProps['list']>(() => [
  {
    title: t('market.steps.4.data.price'),
    value: `${currentItem.value?.price} ₽`,
  },
  {
    title: t('market.steps.4.data.commission'),
    value: `${commissionPercent.value}%`,
  },
  {
    title: t('market.steps.4.data.summary_price'),
    value: `${currentItem.value && getSummaryPrice(currentItem.value)} ₽`,
  },
])
</script>

<style scoped lang="scss">
.shop-v2-step-4 {
  @include column(18px);

  &__pay-type {
    width: 50px;
  }
}
</style>
