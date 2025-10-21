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
          :title="shopItemNameMap[item.name] || snakeToSentence(item.name)"
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
        <!-- MANAGER DATA -->
        <ui-table-data
          v-if="item.manager_withdraw_info"
          class="case-item__table"
          :list="managerMain"
        >
          <template #row-2>
            <div class="case-item__manager-buttons">
              <ui-button-base
                :text="$t('profile.manager_data.main.chat_button')"
                icon-right="foreign"
                size="42"
                @click="
                  tg.openTelegramLink(
                    `https://t.me/${item.manager_withdraw_info.manager_username}`,
                  )
                "
              />
              <ui-button-base
                :text="$t('profile.manager_data.main.what_to_do_button')"
                icon-right="information-circle"
                size="42"
                view="secondary-light"
                @click="whatToDoModalOpen = true"
              />
            </div>
          </template>
        </ui-table-data>
        <profile-manager-withdraw-data
          v-if="item?.manager_withdraw_info"
          :item="item"
        />
        <!-- ADOPT ME -->
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
        <!-- MM2 -->
        <ui-table-data
          v-if="item.game === 'mm2'"
          class="case-item__table"
          :list="mm2DataListItem"
        />
        <!-- GROWAGARDEN -->
        <ui-table-data
          v-if="isGrowagarden"
          class="case-item__table"
          :list="growagardenDataListItem"
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
        v-if="isGrowagarden && item.status === 'withdraw_success'"
        class="case-item__button"
        size="52"
        icon="telegram"
        view="secondary"
        :text="$t('profile.items.not_received_pet')"
        @click="onClickSupport"
      />
      <ui-button-base
        class="case-item__button"
        size="52"
        :icon-right="isOwned && item.crystal_price ? 'coin-1' : undefined"
        :text="
          isOwned && item.crystal_price
            ? $t('common.sellForCoins', { n: formattedPrice })
            : $t('common.close')
        "
        @click="onClick"
      />

      <!-- MODAL -->
      <profile-manager-what-to-do-modal
        v-model:is-open="whatToDoModalOpen"
        :item="item"
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
import { shopItemNameMap } from '@/pages/shop/-helpers'

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
const { sellItem, withdrawItem, getItem, shareItem } = useItemsStore()
const { isGrowagarden } = useCaseGame(item)

const loadingButtons = ref<InteractiveProps['loading']>([])
const whatToDoModalOpen = ref(false)

const onShare = async () => {
  try {
    loadingButtons.value = ['share']
    const shareId = await shareItem(id)

    tg.shareMessage(shareId)
      .then()
      .catch(() => Telegram.WebApp.showAlert('Не удалось поделиться'))
  } catch {
    // error
  } finally {
    loadingButtons.value = []
  }
}

const countdown = useCountdown(
  computed(() => item.value?.crystal_sell_timer || ''),
)

const isOwned = computed(
  () =>
    item.value?.status === 'owned' ||
    item.value?.status === 'withdraw_error' ||
    item.value?.status === 'waiting_manager',
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

  if (!isOwned.value || !item.value?.crystal_price) {
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
  ...(item.value?.crystal_price
    ? [
        {
          title: `${t('common.price')}`,
          value: item.value?.crystal_price,
        },
      ]
    : []),
])

const managerMain = computed<TableDataProps['list']>(() => [
  {
    title: t('profile.manager_data.main.title'),
    value: '',
  },
  {
    title: '',
    value: '',
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
    value:
      item.value?.data &&
      'age' in item.value.data &&
      snakeToSentence(item.value.data.age || ''),
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

const growagardenDataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.rarity'),
    value:
      item.value?.data &&
      'rarity' in item.value.data &&
      t(`rarity.${item.value?.data.rarity}`),
  },
  // {
  //   title: t('common.subtype'),
  //   value:
  //     item.value?.data &&
  //     'item_sub_type' in item.value.data &&
  //     snakeToSentence(item.value?.data.item_sub_type || ''),
  // },
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
  if (!item.value) return

  if (item.value.crystal_price) {
    await sellItem(item.value.id, item.value.crystal_price)
    await getItem(id)
  } else {
    await popup.showAlert('Вы не можете продать этот предмет')
  }
}

const onClick = () => {
  if (isOwned.value && item.value?.crystal_price) {
    onSell()
  } else {
    router.back()
  }
}

const onWithdraw = async () => {
  if (!item.value) return

  if (userInfo.value?.starpets_info || isGrowagarden.value) {
    if (item.value.status === 'waiting_manager') {
      navigateTo(`/case-item/${id}/withdraw`)
      return
    }

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

const onClickSupport = () => {
  tg.openTelegramLink('https://t.me/playly_support')
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

  &__manager-buttons {
    @include row(12px);

    width: 100%;
  }
}
</style>
