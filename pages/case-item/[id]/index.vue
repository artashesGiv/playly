<template>
  <transition-fade>
    <div v-if="item && isMounted" class="case-item">
      <div
        class="case-item__gradient"
        :style="{ background: `var(--${mapRareColor[item.rarity]}-gradient)` }"
      />
      <div class="case-item__content">
        <item-main-data
          :image="item.image_url"
          :title="snakeToSentence(item.name)"
          :description="snakeToSentence(item.age)"
        />
        <item-interactive
          :disabled="disableButtons"
          @sell="onSell"
          @withdraw="onWithdraw"
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
        <ui-table-data class="case-item__table" :list="dataListItem">
          <template #row-1>
            <cases-item-abilities
              :flyable="item.flyable"
              :rideable="item.rideable"
              class="item-case__abilities"
            />
          </template>
        </ui-table-data>
        <ui-table-data class="case-item__table" :list="dataTimer">
          <template #row-1="{ value }">
            <div class="case-item__row">
              <span>{{ value }}</span>
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
import type { CaseItem } from '@/types'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import type { InteractiveProps } from '@/components/item-interactive.vue'
import { useItemsStore, useUserStore } from '@/store'

definePageMeta({
  layout: 'empty',
})
useBackButton()

const { t } = useI18n()
const { tg } = useTelegram()
const route = useRoute()
const router = useRouter()
const id = route.params.id as CaseItem['id']
const isMounted = ref(false)

const { item } = storeToRefs(useItemsStore())
const { userInfo } = storeToRefs(useUserStore())
const { sellItem, withdrawItem, getItem } = useItemsStore()
const countdown = useCountdown(item.value?.crystal_sell_timer || '')

const isOwned = computed(() => item.value?.status === 'owned')
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

const dataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.properties'),
    value: '',
  },
  {
    title: t('common.rarity'),
    value: t(`rarity.${item.value?.rarity}`),
  },
  {
    title: t('common.age'),
    value: item.value?.age,
  },
])

const dataTimer = computed<TableDataProps['list']>(() => [
  {
    title: t('profile.sellTimeCard.title'),
    value: countdown,
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
  }

  if (isReceived.value) {
    router.back()
  }
}

const onWithdraw = async () => {
  if (userInfo.value?.starpets_info && item.value) {
    if (isOwned.value) {
      await withdrawItem(item.value.id)
      await getItem(id)
    }

    navigateTo(`/case-item/${id}/withdraw`)
  } else {
    tg?.showAlert('Сначала привяжите аккаунт Starpets')
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
