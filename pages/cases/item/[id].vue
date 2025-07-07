<template>
  <div class="case-item">
    <div class="case-item__content">
      <div class="case-item__card">
        <div
          class="background"
          :style="{
            background: `var(--${mapRareColor[receivedItem?.rarity] || 'yellow'}-gradient)`,
          }"
        />
        <item-main-data
          :image="receivedItem?.image_url || ''"
          :title="title"
          :description="snakeToSentence(receivedItem?.item_type || '')"
          class="case-item__main-data"
        />
        <ui-table-data
          v-if="!isRobuxCase"
          class="case-item__table"
          :list="dataList"
        >
          <template #row-1>
            <div class="case-item__abilities">
              <cases-item-abilities
                :flyable="receivedItem?.flyable"
                :rideable="receivedItem?.rideable"
              />
            </div>
          </template>
        </ui-table-data>
        <ui-table-data v-else :list="robuxDataList" class="case-item__table">
          <template #row-1>
            <user-data />
          </template>
          <template #row-2="{ value }">
            <div class="case-item__price">
              <span>{{ value }}</span>
              <main-mascot size="xs" />
            </div>
          </template>
        </ui-table-data>
      </div>
      <span class="case-item__description">
        {{ $t('cases.roulette.canSell') }}
      </span>
    </div>
    <div class="case-item__buttons">
      <ui-button-base
        view="secondary"
        :text="$t('cases.roulette.openMore', { n: formattedPriceCase })"
        icon-right="coin-1"
        size="52"
        @click="onOpenMore"
      />
      <ui-button-base
        :text="
          $t('cases.roulette.sellItem', {
            n: formattedPriceItem,
          })
        "
        icon-right="coin-1"
        size="52"
        @click="onSellItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCasesStore, useItemsStore } from '@/store'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import type { Case } from '@/types'
import { snakeToSentence } from '@/utils/snake-to-sentence'
import UserData from '@/components/user-data.vue'

definePageMeta({
  layout: 'empty',
})
useBackButton()

const route = useRoute()
const { receivedItem, cases } = storeToRefs(useCasesStore())
const { sellItem, sellItemRobux } = useItemsStore()
const { t } = useI18n()
const { user } = useTelegram()
const isSellForCoins = ref(false)

const id = route.params.id as Case['id']

const currentCase = computed(() => cases.value.find(item => item.id === id))
const isRobuxCase = computed(() => currentCase.value?.category === 'robux')
const title = computed(() => {
  return isRobuxCase.value
    ? `${receivedItem.value?.robux_amount} R$`
    : snakeToSentence(receivedItem.value?.name || '')
})

const formattedPriceCase = computed(() =>
  formatePrice(currentCase?.value?.price || 0),
)

const formattedPriceItem = computed(() =>
  formatePrice(receivedItem?.value?.crystal_price || 0),
)

const dataList: TableDataProps['list'] = [
  {
    title: t('common.properties'),
    value: '',
  },
  {
    title: t('common.rarity'),
    value: snakeToSentence(receivedItem?.value?.rarity || ''),
  },
  {
    title: t('common.age'),
    value: receivedItem?.value?.age,
  },
]

const robuxDataList = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: user,
  },
  {
    title: `${t('robux.balance.priceFor')} 1 R$`,
    value: 18,
  },
])

const onOpenMore = () => {
  navigateTo(`/cases/${currentCase.value!.id}?scroll=true`, { replace: true })
}

const onSellItem = async () => {
  if (isRobuxCase.value) {
    await sellItemRobux(receivedItem.value!.id)
  } else {
    sellItem(receivedItem.value!.id, receivedItem.value!.crystal_price).then(
      () => {
        isSellForCoins.value = true
        navigateTo('/cases')
      },
    )
  }
}

onMounted(() => {
  if (!receivedItem.value) {
    navigateTo('/cases')
  }
})

onBeforeUnmount(async () => {
  if (!isSellForCoins.value) {
    await sellItemRobux(receivedItem.value!.id)
  }
})
</script>

<style scoped lang="scss">
.case-item {
  @include column(18px);

  flex-grow: 1;

  &__content {
    @include column(14px);

    flex-grow: 1;
  }

  &__main-data {
    position: relative;
    z-index: 2;
  }

  &__card {
    @include column;

    position: relative;
    align-items: center;
    text-align: center;
    border-radius: 22px;
    padding: 12px;
    overflow: hidden;
    background-color: var(--dark-900);

    & > h4 {
      margin-top: 18px;
    }
    & > span {
      font: var(--font-base-medium);
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 168px;
    }
  }

  &__abilities {
    @include row(8px);
  }

  &__image {
    width: 134px;
    height: 134px;
  }

  &__table {
    margin-top: 33px;
    background-color: var(--dark-700);
  }

  &__description {
    font: var(--font-base-medium);
  }

  &__price {
    @include row(8px);
  }

  &__buttons {
    @include column(12px);
  }
}
</style>
