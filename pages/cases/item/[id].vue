<template>
  <div v-if="receivedItem" class="case-item">
    <div class="case-item__content">
      <div class="case-item__card">
        <div
          class="background"
          :style="{
            background: `var(--${'rarity' in receivedItem.data ? mapRareColor[receivedItem.data?.rarity] : 'yellow'}-gradient)`,
          }"
        />
        <item-main-data
          :image="
            isCoinsItem
              ? '/images/main/mascot.png'
              : receivedItem?.image_url || ''
          "
          :title="title"
          :description="
            !('item_type' in receivedItem.data)
              ? ''
              : snakeToSentence(receivedItem.data.item_type || '')
          "
          class="case-item__main-data"
        />
        <ui-table-data
          v-if="receivedItem.game === 'adopt_me' && !isCoinsItem"
          class="case-item__table"
          :list="adoptMeDataList"
        >
          <template #row-1>
            <div class="case-item__abilities">
              <cases-item-abilities
                :flyable="receivedItem.data.flyable"
                :rideable="receivedItem.data.rideable"
              />
            </div>
          </template>
        </ui-table-data>
        <ui-table-data
          v-if="receivedItem.game === 'mm2' && !isCoinsItem"
          class="case-item__table"
          :list="mm2DataList"
        />
        <ui-table-data
          v-if="isGrowagarden && !isCoinsItem"
          class="case-item__table"
          :list="growagardenDataListItem"
        />

        <ui-table-data
          v-else-if="isRobux"
          :list="robuxDataList"
          class="case-item__table"
        >
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
        {{
          isCoinsItem
            ? $t('cases.roulette.coins')
            : $t('cases.roulette.canSell')
        }}
      </span>
      <div v-if="isOnboarding" class="case-item__text">
        <h2>{{ $t('onboarding-v2.step-4.title') }}</h2>
        <span>{{ $t('onboarding-v2.step-4.description') }}</span>
      </div>
    </div>
    <div class="case-item__buttons">
      <ui-button-base
        v-if="isOnboarding"
        :text="$t('common.continue')"
        size="52"
        @click="() => navigateTo('/onboarding-v2?step=5')"
      />
      <ui-button-base
        v-if="!isOnboarding"
        view="secondary"
        :text="$t('cases.roulette.openMore', { n: formattedPriceCase })"
        icon-right="coin-1"
        size="52"
        @click="onOpenMore"
      />
      <ui-button-base
        v-if="!isCoinsItem && !isOnboarding"
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
import {
  useAuthStore,
  useCasesStore,
  useItemsStore,
  useUserStore,
} from '@/store'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import type { Case } from '@/types'
import { snakeToSentence } from '@/utils/snake-to-sentence'
import UserData from '@/components/user-data.vue'
import { stopAudio } from '@/utils/playAudio'
import { useCaseGame } from '@/composables/useCaseGame'

definePageMeta({
  layout: 'empty',
})

const route = useRoute()
const router = useRouter()
const { receivedItem, cases } = storeToRefs(useCasesStore())
const { rates } = storeToRefs(useAuthStore())
const { sellItem, sellItemRobux } = useItemsStore()
const { itemNeedUpdate } = storeToRefs(useItemsStore())
const { balance } = storeToRefs(useUserStore())
const { popup, haptic } = useTelegram()
const { t } = useI18n()
const { user } = useTelegram()
const isSellForCoins = ref(false)

const id = route.params.id as Case['id']
const isOnboarding = !!route.query.onboarding

useBackButton(() => {
  if (!isOnboarding) {
    stopAudio()
    router.back()
  }
})

const currentCase = computed(() => cases.value.find(item => item.id === id))

const { isCoinsItem, isRobux, isGrowagarden } = useCaseGame(receivedItem)

const title = computed(() => {
  if (isRobux.value) {
    return `${receivedItem.value!.robux_amount} R$`
  }

  if (isCoinsItem.value) {
    return formatePrice(receivedItem.value?.crystal_price || 0)
  }

  return snakeToSentence(receivedItem.value?.name || '')
})

const formattedPriceCase = computed(() =>
  formatePrice(currentCase.value?.price || 0),
)

const formattedPriceItem = computed(() =>
  formatePrice(receivedItem.value?.crystal_price || 0),
)

const adoptMeDataList = computed<TableDataProps['list']>(() => [
  {
    title: t('common.properties'),
    value: '',
  },
  {
    title: t('common.rarity'),
    value:
      receivedItem.value?.data && 'rarity' in receivedItem.value.data
        ? snakeToSentence(receivedItem.value.data.rarity || '')
        : '',
  },
  {
    title: t('common.age'),
    value:
      receivedItem.value?.data && 'age' in receivedItem.value.data
        ? snakeToSentence(receivedItem.value.data.age || '')
        : '',
  },
])

const mm2DataList = computed<TableDataProps['list']>(() => [
  {
    title: t('common.rarity'),
    value:
      receivedItem.value?.data && 'rarity' in receivedItem.value.data
        ? snakeToSentence(receivedItem.value.data.rarity || '')
        : '',
  },
  {
    title: t('common.subtype'),
    value:
      receivedItem.value?.data &&
      'item_sub_type' in receivedItem.value.data &&
      snakeToSentence(receivedItem.value?.data.item_sub_type || ''),
  },
])

const growagardenDataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.rarity'),
    value:
      receivedItem.value?.data &&
      'rarity' in receivedItem.value.data &&
      t(`rarity.${receivedItem.value?.data.rarity}`),
  },
  // {
  //   title: t('common.subtype'),
  //   value:
  //     item.value?.data &&
  //     'item_sub_type' in item.value.data &&
  //     snakeToSentence(item.value?.data.item_sub_type || ''),
  // },
])

const robuxDataList = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: user,
  },
  {
    title: `${t('robux.balance.priceFor')} 1 R$`,
    value: rates.value?.robux2crystal,
  },
])

const onOpenMore = () => {
  if (currentCase.value!.price > balance.value) {
    haptic.impactOccurred('rigid')
    popup?.showAlert?.('Недостаточно средств')
    return
  }

  haptic.impactOccurred('heavy')
  navigateTo(`/cases/${currentCase.value!.id}?scroll=true`, { replace: true })
}

const onSellItem = async () => {
  haptic.impactOccurred('heavy')
  if (isRobux.value) {
    await sellItemRobux(receivedItem.value!.robux_amount!)
  } else {
    await sellItem(receivedItem.value!.id, receivedItem.value!.crystal_price!)
  }

  isSellForCoins.value = true
  navigateTo(`/cases/${currentCase.value!.id}`)
}

onMounted(() => {
  if (!receivedItem.value) {
    navigateTo('/cases')
  }
})

onBeforeUnmount(() => {
  itemNeedUpdate.value = true
  receivedItem.value = null
})
</script>

<style scoped lang="scss">
.case-item {
  @include column(18px);

  flex-grow: 1;
  padding: 18px 0;

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

  &__text {
    @include column(6px);

    align-items: center;
    text-align: center;

    h2 {
      font: var(--font-large-semibold);
      color: var(--white);
    }

    span {
      font: var(--font-large-medium);
      color: var(--light-500);
    }
  }
}
</style>
