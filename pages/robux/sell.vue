<template>
  <div class="sell">
    <robux-sell-header />
    <div class="sell__content">
      <div class="sell__text">
        <h2 class="title">{{ $t('common.r$', robuxBalance) }}</h2>
        <span class="description">{{ $t('robux.balance.description') }}</span>
      </div>
      <ui-table-data :list="dataList">
        <template #row-1>
          <user-data />
        </template>
        <template #row-2="{ value }">
          <div class="sell__price">
            <span>{{ value }}</span>
            <main-mascot size="xs" />
          </div>
        </template>
      </ui-table-data>
      <ui-divider />
      <div class="sell__inputs">
        <ui-input-base
          v-model="payValue"
          icon-color="yellow"
          :label="$t('robux.input.labelPay')"
          icon="robux"
          type="number"
        />
        <ui-input-base
          v-model="getValue"
          :label="$t('robux.input.labelReceived')"
          icon="robux"
          icon-color="yellow"
          type="number"
        >
          <template #icon>
            <main-mascot size="s" class="sell__mascot" />
          </template>
        </ui-input-base>
      </div>
      <ui-divider />
      <div class="sell__buttons">
        <ui-button-base
          view="secondary"
          text="150 R$"
          size="46"
          @click="payValue = 150"
        />
        <ui-button-base
          view="secondary"
          text="300 R$"
          size="46"
          @click="payValue = 300"
        />
        <ui-button-base
          view="secondary"
          text="500 R$"
          size="46"
          @click="payValue = 500"
        />
      </div>
      <span class="description">
        {{ $t('robux.sell.text') }}
      </span>
    </div>
    <ui-button-base
      icon="buy-1"
      :text="$t('common.sellForCoins', +getValue)"
      :style="{ flexShrink: 0 }"
      :is-disabled="!payValue"
      size="52"
      @click="onSell"
    />
  </div>
</template>

<script setup lang="ts">
import { useItemsStore, useUserStore } from '@/store'
import UserData from '@/components/user-data.vue'
import type { TableDataProps } from '@/components/ui/table-data.vue'

definePageMeta({
  layout: 'empty',
})

useBackButton()

const { t } = useI18n()
const { user } = useTelegram()
const router = useRouter()
const { robuxBalance } = storeToRefs(useUserStore())
const { sellItemRobux } = useItemsStore()
const dataList = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: user,
  },
  {
    title: `${t('robux.balance.priceFor')} 1 R$`,
    value: 18,
  },
])

const COEFFICIENT = 4

const payValue = ref(0)
const getValue = ref(0)

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

const onSell = async () => {
  await sellItemRobux(getValue.value)
  router.back()
}
</script>

<style scoped lang="scss">
.sell {
  @include column(18px);
  text-align: center;

  .description {
    text-align: left;
    font: var(--font-base-medium);
  }

  &__content {
    @include column(18px);
  }

  &__text {
    @include column(2px);

    .description {
      font: var(--font-base-medium);
    }
  }

  &__price {
    @include row(8px);
  }

  &__inputs {
    @include column(12px);
  }

  &__mascot {
    flex-shrink: 0;
  }

  &__buttons {
    @include row(8px);
  }
}
</style>
