<template>
  <div class="shop-v2-step-3">
    <ui-table-data :list="dataListOwn">
      <template #row-2="{ value }">
        <user-data :name="value.name" :photo_url="value.avatar_url" />
      </template>
      <template #row-4="{ value }">
        <div class="shop-v2-step-3__price">
          <span>{{ value }}</span>
          <ui-icon-base name="robux" class="shop-v2-step-3__icon-robux" />
        </div>
      </template>
    </ui-table-data>
    <ui-input-base
      v-model="marketFlowData.email"
      v-model:is-error="errors[3].input"
      type="email"
      placeholder="Email"
    />
    <div class="shop-v2-step-3__list">
      <pay-card
        v-for="item in payCards"
        :key="item"
        :type="item"
        :is-active="item === activePayType"
        :is-error="errors[3].select"
        @click="onClick(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopV2FlowStore, useUserStore } from '@/store'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import type { PayCard } from '@/components/pay-card.vue'

const { marketFlowData, errors } = storeToRefs(useShopV2FlowStore())
const { getSummaryPrice } = useShopV2FlowStore()
const { userInfo } = storeToRefs(useUserStore())

const { t } = useI18n()
const { popup } = useTelegram()
const route = useRoute()

const isErrorPay = route.query.error === 'true'

const activePayType = computed(() => marketFlowData.value.activePayType)
const currentItem = computed(() => marketFlowData.value.item)

const dataListOwn = computed<TableDataProps['list']>(() => [
  {
    title: t('market.steps.3.data.item'),
    value: snakeToSentence(currentItem.value?.name || ''),
  },
  {
    title: t('market.steps.3.data.account'),
    value: marketFlowData.value.user,
  },
  {
    title: t('market.steps.3.data.price'),
    value: `${getSummaryPrice(currentItem.value)} ₽`,
  },
])

const payCards: PayCard['type'][] = ['cards', 'SBP']

const onClick = (item: PayCard['type']) => {
  errors.value[3].select = false
  marketFlowData.value.activePayType = item
}

onMounted(() => {
  marketFlowData.value.email = userInfo.value?.email || ''

  if (isErrorPay) {
    nextTick(() => {
      popup?.showAlert?.('Произошла ошибка при оплате, попробуйте еще раз')
      route.query.error = 'false'
    })
  }
})
</script>

<style scoped lang="scss">
.shop-v2-step-3 {
  @include column(18px);

  &__price {
    @include row(8px);
  }

  &__icon-robux {
    font-size: 22px;
    color: var(--yellow-500);
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
