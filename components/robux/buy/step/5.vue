<template>
  <div class="robux-buy-5">
    <ui-table-data :list="dataListOwn">
      <template #row-1>
        <user-data />
      </template>
      <template #row-3="{ value }">
        <div class="robux-buy-5__price">
          <span>{{ value }}</span>
          <ui-icon-base name="robux" class="robux-buy-5__icon-robux" />
        </div>
      </template>
    </ui-table-data>
    <div class="robux-buy-5__list">
      <pay-card
        v-for="item in payCards"
        :key="item"
        :type="item"
        :is-active="item === activePayType"
        @click="onClick(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'
import UserData from '@/components/user-data.vue'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import type { PayCard } from '@/components/pay-card.vue'

const { getValue, activePayType } = storeToRefs(useRobuxBuyStore())

const { t } = useI18n()
const { tg } = useTelegram()
const route = useRoute()
const isErrorPay = route.query.error === 'true'

const dataListOwn = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: tg?.initDataUnsafe?.user,
  },
  {
    title: t('common.you_pay'),
    value: '$56',
  },
  {
    title: `${t('common.you_receive')}`,
    value: getValue.value,
  },
])

const payCards: PayCard['type'][] = [
  'bitcoin',
  'youmoney',
  'mastercard',
  'tether',
  'visa',
  'gpay',
]

const onClick = (item: PayCard['type']) => {
  activePayType.value = item
}

onMounted(() => {
  if (isErrorPay) {
    nextTick(() => {
      tg?.showAlert('Произошла ошибка при оплате, попробуйте еще раз')
    })
  }
})
</script>

<style scoped lang="scss">
.robux-buy-5 {
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
