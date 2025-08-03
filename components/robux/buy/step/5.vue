<template>
  <div class="robux-buy-5">
    <ui-table-data :list="dataListOwn">
      <template #row-1>
        <user-data />
      </template>
      <template #row-4="{ value }">
        <div class="robux-buy-5__price">
          <span>{{ value }}</span>
          <ui-icon-base name="robux" class="robux-buy-5__icon-robux" />
        </div>
      </template>
    </ui-table-data>
    <ui-input-base
      v-model="email"
      v-model:is-error="errors[5].input"
      type="email"
      placeholder="Email"
    />
    <div class="robux-buy-5__list">
      <pay-card
        v-for="item in payCards"
        :key="item"
        :type="item"
        :is-active="item === activePayType"
        :is-error="errors[5].select"
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

const { getValue, activePayType, email, amount, errors } =
  storeToRefs(useRobuxBuyStore())

const { t } = useI18n()
const { popup, tg } = useTelegram()
const route = useRoute()

const isErrorPay = route.query.error === 'true'

const commissionPercent = computed(() => {
  switch (activePayType.value) {
    case 'SBP': {
      return 5
    }
    case 'cards': {
      return 6
    }

    default: {
      return 0
    }
  }
})

const payValueWithCommission = computed(() =>
  (amount.value + amount.value * (commissionPercent.value / 100)).toFixed(2),
)

const dataListOwn = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: tg?.initDataUnsafe?.user,
  },
  {
    title: t('common.you_pay'),
    value: '',
  },
  {
    title: t('common.with_commission'),
    value: `${payValueWithCommission.value} ₽`,
  },
  {
    title: `${t('common.you_receive')}`,
    value: getValue.value,
  },
])

const payCards: PayCard['type'][] = ['cards', 'SBP']

const onClick = (item: PayCard['type']) => {
  errors.value[5].select = false
  activePayType.value = item
}

onMounted(() => {
  if (isErrorPay) {
    nextTick(() => {
      popup?.showAlert?.('Произошла ошибка при оплате, попробуйте еще раз')
      route.query.error = 'false'
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
