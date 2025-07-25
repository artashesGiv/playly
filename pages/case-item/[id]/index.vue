<template>
  <transition-fade>
    <div v-if="item && isMounted" class="case-item">
      <div
        class="case-item__gradient"
        :style="{
          background: `var(--${'rarity' in item.data ? mapRareColor[item.data?.rarity] : 'yellow'}-gradient)`,
        }"
      />
      <div class="case-item__content">
        <item-main-data
          :image="item.image_url"
          :title="snakeToSentence(item.name)"
          :description="
            ('item_type' in item.data &&
              snakeToSentence(item.data.item_type)) ||
            ''
          "
          class="case-item__data"
        />
        <item-interactive
          :disabled="disableButtons"
          :loading="loadingButtons"
          @sell="onSell"
          @withdraw="onWithdraw"
          @share="onShare"
        />
        <ui-divider />
        <ui-table-data :list="dataListOwn">
          <template #row-1>
            <user-data />
          </template>
          <template #row-3="{ value }">
            <div class="case-item__row">
              <span>{{ formatePrice(value) }}</span>
              <main-mascot size="xs" />
            </div>
          </template>
        </ui-table-data>
        <ui-table-data
          v-if="item.game === 'adopt_me'"
          class="case-item__table"
          :list="adoptMeDataListItem"
        >
          <template #row-1>
            <cases-item-abilities
              :flyable="item.data.flyable"
              :rideable="item.data.rideable"
              class="item-case__abilities"
            />
          </template>
        </ui-table-data>
        <ui-table-data
          v-if="item.game === 'mm2'"
          class="case-item__table"
          :list="mm2DataListItem"
        />
        <ui-table-data
          v-if="item.status === 'owned'"
          class="case-item__table"
          :list="dataTimer"
        >
          <template #row-1>
            <div class="case-item__row">
              <span>{{ countdown }}</span>
              <ui-icon-base name="clock" />
            </div>
          </template>
          <template #row-2="{ value }">
            <div class="case-item__text">
              {{ value }}
            </div>
          </template>
        </ui-table-data>
      </div>
      <ui-button-base
        class="case-item__button"
        size="52"
        :icon-right="isOwned ? 'coin-1' : undefined"
        :text="
          isOwned
            ? $t('common.sellForCoins', { n: formattedPrice })
            : $t('common.close')
        "
        @click="onClick"
      />
    </div>
  </transition-fade>
</template>

<script setup lang="ts">
import type { PersonalCaseItem } from '@/types'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import type { InteractiveProps } from '@/components/item-interactive.vue'
import { useItemsStore, useUserStore } from '@/store'
import { snakeToSentence } from '@/utils/snake-to-sentence'

definePageMeta({
  layout: 'empty',
})
useBackButton()

const { t } = useI18n()
const { tg, popup } = useTelegram()
const route = useRoute()
const router = useRouter()
const id = route.params.id as PersonalCaseItem['id']
const isMounted = ref(false)

const { item } = storeToRefs(useItemsStore())
const { userInfo } = storeToRefs(useUserStore())
const { sellItem, withdrawItem, getItem } = useItemsStore()

useHead(() => ({
  title: 'Я получил AWP | Worm God (Field-Tested) в RFL Blast',
  meta: [
    {
      property: 'og:title',
      content: 'Я получил AWP | Worm God (Field-Tested) в RFL Blast',
    },
    { property: 'og:description', content: 'RFL Blast: кейсы CS2' },
    { property: 'og:image', content: 'https://yourdomain.com/path/to/awp.png' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: item.value?.image_url },
  ],
}))

const onShare = () => {
  // tg?.openTelegramLink(
  //   `https://t.me/share/url?url=${encodeURIComponent(`https://playly.gg/case-item/${item.value?.id}`)}&text=qweqweqweqweqwe`,
  // )
}

const countdown = useCountdown(
  computed(() => item.value?.crystal_sell_timer || ''),
)

const isOwned = computed(
  () =>
    item.value?.status === 'owned' || item.value?.status === 'withdraw_error',
)
const isReceived = computed(
  () =>
    item.value?.status === 'withdraw_success' ||
    item.value?.status === 'sold_by_crystal',
)

const disableButtons = computed<InteractiveProps['disabled']>(() => {
  if (isReceived.value) {
    return ['sell', 'withdraw']
  }

  if (!isOwned.value) {
    return ['sell']
  }

  return undefined
})

const loadingButtons = ref<InteractiveProps['loading']>([])

const formattedPrice = computed(() =>
  formatePrice(item.value?.crystal_price || 0),
)

const dataListOwn = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: tg?.initDataUnsafe?.user,
  },
  {
    title: t('common.status'),
    value: t(`case_status.${item.value?.status}`),
  },
  {
    title: `${t('common.price')}`,
    value: item.value?.crystal_price,
  },
])

const adoptMeDataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.properties'),
    value: '',
  },
  {
    title: t('common.rarity'),
    value:
      item.value?.data &&
      'rarity' in item.value.data &&
      t(`rarity.${item.value?.data.rarity}`),
  },
  {
    title: t('common.age'),
    value: item.value?.data && 'age' in item.value.data && item.value?.data.age,
  },
])

const mm2DataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.rarity'),
    value:
      item.value?.data &&
      'rarity' in item.value.data &&
      t(`rarity.${item.value?.data.rarity}`),
  },
  {
    title: t('common.subtype'),
    value:
      item.value?.data &&
      'item_sub_type' in item.value.data &&
      snakeToSentence(item.value?.data.item_sub_type || ''),
  },
])

const dataTimer = computed<TableDataProps['list']>(() => [
  {
    title: t('profile.sellTimeCard.title'),
    value: '',
  },
  {
    title: '',
    value: t('profile.sellTimeCard.text'),
  },
])

const onSell = async () => {
  if (item.value) {
    await sellItem(item.value.id, item.value.crystal_price)
    await getItem(id)
  }
}

const onClick = () => {
  if (isOwned.value) {
    onSell()
  } else {
    router.back()
  }
}

const onWithdraw = async () => {
  if (!item.value) return

  if (userInfo.value?.starpets_info) {
    if (isOwned.value) {
      try {
        loadingButtons.value = ['withdraw']
        await withdrawItem(item.value.id)

        await getItem(id)
        navigateTo(`/case-item/${id}/withdraw`)
      } catch {
        popup.showAlert(
          'К сожалению, сейчас этот предмет недоступен для вывода. Попробуйте позже',
        )
      } finally {
        loadingButtons.value = []
      }
    } else if (item.value.status === 'in_withdraw_progress') {
      navigateTo(`/case-item/${id}/withdraw`)
    }
  } else {
    popup?.showAlert?.('Сначала привяжите аккаунт Starpets')
    navigateTo('/star-pets-link')
  }
}

onMounted(async () => {
  await getItem(id)
  isMounted.value = true
})
</script>

<style scoped lang="scss">
.case-item {
  @include column(18px);

  padding: 18px 0;
  height: 100%;

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 226px;
  }

  &__content {
    @include column(18px);

    text-align: center;
    flex-grow: 1;
    overflow-y: auto;
  }

  &__data {
    position: relative;
    z-index: 2;
  }

  &__row {
    @include row(8px);
  }

  &__text {
    text-align: left;
  }

  &__button {
    flex-shrink: 0;
  }
}
</style>
