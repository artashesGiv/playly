<template>
  <ui-modal-base
    :is-open="isOpen"
    class="order-modal"
    full-height
    view="dark"
    without-header
  >
    <div v-if="withdraw && shopItem && game" class="order-modal__wrapper">
      <ui-button-base
        view="secondary"
        icon="close"
        size="46"
        class="order-modal__close"
        @click="emits('update:isOpen', false)"
      />
      <ui-button-base
        :loading="loading"
        :is-disabled="isButtonDisabled"
        view="secondary"
        icon="refresh-2"
        class="order-modal__refresh"
        @click="handleClickWithCooldown"
      />
      <div class="order-modal__header">
        <div
          class="order-modal__icon-wrapper"
          :class="{ 'order-modal__icon-wrapper--failed': isFailed }"
        >
          <ui-icon-base :name="isFailed ? 'close-circle' : 'check-square'" />
        </div>
        <div class="order-modal__text">
          <span>{{ textMap[globalStatus].title }}</span>
          <span>{{ textMap[globalStatus].description }}</span>
        </div>
      </div>
      <div class="order-modal__content">
        <shop-v2-withdraw-users
          v-if="isFindManager && withdraw.supplier_info"
          :user="withdraw.roblox_account"
          :supplier="withdraw.supplier_info"
        />

        <ui-divider
          v-if="isFindManager && withdraw.supplier_info"
          view="light"
        />

        <shop-v2-data-card :item="shopItem" :game="game" />
        <ui-divider v-if="isPaid || isInGame" view="light" />
        <ui-card v-if="isInGame" class="order-modal__specialist">
          <span class="order-modal__specialist-title">
            {{ $t('market.steps.5.steps.3.specialist') }}
          </span>
          <div class="order-modal__specialist-data">
            <span>{{ withdraw.supplier_info?.supplier_roblox_username }}</span>
            <nuxt-img
              :src="
                withdraw.supplier_info?.supplier_roblox_avatar ||
                'https://playly.b-cdn.net/playly_ico.png'
              "
            />
          </div>
        </ui-card>
        <span v-if="isPaid" class="font-base-medium">
          {{ $t('market.steps.5.steps.1.description') }}
        </span>
        <span v-if="isInGame" class="font-base-medium">
          {{ $t('market.steps.5.steps.3.description') }}
        </span>
      </div>
      <div class="order-modal__footer">
        <!--        <ui-card v-if="isPaid" class="order-modal__timer" view="light">-->
        <!--          <span>{{ $t('market.steps.5.steps.1.timer.title') }}</span>-->
        <!--          <div class="order-modal__timer-right">-->
        <!--            <span>{{ $t('market.steps.5.steps.1.timer.description') }}</span>-->
        <!--            <ui-spinner view="light" />-->
        <!--          </div>-->
        <!--        </ui-card>-->
        <!--        <ui-button-base-->
        <!--          text="test"-->
        <!--          size="52"-->
        <!--          @click="-->
        <!--            updateWithdraw(withdrawId!, {-->
        <!--              status: 'withdraw_success',-->
        <!--              category_status: '',-->
        <!--              supplier_info: {-->
        <!--                supplier_id: 123456,-->
        <!--                supplier_roblox_avatar: null,-->
        <!--                supplier_roblox_id: 1,-->
        <!--                supplier_roblox_url: '',-->
        <!--                supplier_roblox_username: 'string',-->
        <!--              },-->
        <!--            })-->
        <!--          "-->
        <!--        />-->
        <template v-if="isFindManager && withdraw.supplier_info">
          <ui-button-base
            :text="$t('market.steps.5.steps.2.buttons.link')"
            size="52"
            icon-right="foreign"
            @click="
              tg.openLink(
                `https://www.roblox.com/users/${withdraw.supplier_info.supplier_roblox_id}/profile`,
              )
            "
          />
          <ui-button-base
            :icon-right="icon"
            view="secondary-light"
            :text="withdraw.supplier_info.supplier_roblox_username"
            size="52"
            @click="onClick"
          />
        </template>
        <template v-if="isInGame">
          <ui-button-base
            :text="$t('market.steps.5.steps.3.buttons.link')"
            size="52"
            icon-right="foreign"
            @click="
              tg.openLink(withdraw.supplier_info?.supplier_roblox_url || '')
            "
          />
        </template>
      </div>
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
import type { ShopV2SummaryStatus, ShopV2Withdraw } from '@/types'
import type { ShopV2DataCard } from '@/components/shop-v2/data-card.vue'
import { useShopV2FlowStore, useShopV2Store } from '@/store'

export type ShopV2OrderModalProps = {
  isOpen: boolean
  withdrawId: Maybe<ShopV2Withdraw['id']>
}

const { tg } = useTelegram()
const { allWithdrawsPool } = storeToRefs(useShopV2Store())
const { updateWithdraw, getOneWithdraw } = useShopV2Store()
const { getSummaryStatus } = useShopV2FlowStore()

type LocalStatus = 'paid' | 'find_manager' | 'in_game' | 'success' | 'failed'

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

const props = defineProps<ShopV2OrderModalProps>()
const emits = defineEmits<Emits>()

const { t } = useI18n()

const withdraw = computed({
  get: () => allWithdrawsPool.value[props.withdrawId!],
  set: newValue => (allWithdrawsPool.value[props.withdrawId!] = newValue),
})

const shopItem = computed<Maybe<ShopV2DataCard['item']>>(() => {
  if (withdraw.value) {
    return {
      name: withdraw.value.shop_item_name,
      image_url: withdraw.value.shop_item_image_url,
      data: withdraw.value.data,
    }
  }

  return null
})

const loading = useKeyLoading('get-withdraw')

const isButtonDisabled = ref(false)

const handleClickWithCooldown = async () => {
  if (isButtonDisabled.value) return

  isButtonDisabled.value = true
  try {
    const withdraw = await getOneWithdraw(props.withdrawId!)
    updateWithdraw(props.withdrawId!, withdraw)
  } finally {
    setTimeout(() => {
      isButtonDisabled.value = false
    }, 5000)
  }
}

const summaryStatus = computed<ShopV2SummaryStatus>(() => {
  if (!withdraw.value) return 'order_created'
  return getSummaryStatus(withdraw.value)
})

const globalStatus = computed(() => {
  switch (localStatus.value) {
    case 'failed':
      return 'failed'
    case 'success':
      return 'success'
    default:
      return 'base'
  }
})

const textMap = {
  base: {
    title: t(`market.steps.5.title`),
    description: t(`market.steps.5.headerDescription`),
  },
  success: {
    title: t(`market.steps.5.titleSuccess`),
    description: t(`market.steps.5.headerDescriptionSuccess`),
  },
  failed: {
    title: t(`market.steps.5.titleFailed`),
    description: t(`market.steps.5.headerDescriptionFailed`),
  },
}

const localStatus = computed<LocalStatus>(() => {
  switch (summaryStatus.value) {
    case 'paid':
    case 'order_created': {
      return 'paid'
    }
    case 'find_manager':
    case 'friend': {
      return 'find_manager'
    }
    case 'in_game': {
      return 'in_game'
    }
    case 'success': {
      return 'success'
    }
    default: {
      return 'failed'
    }
  }
})

const isPaid = computed(() => localStatus.value === 'paid')
const isFindManager = computed(() => localStatus.value === 'find_manager')
const isInGame = computed(() => localStatus.value === 'in_game')
const isFailed = computed(() => localStatus.value === 'failed')

const game = computed<Maybe<ShopV2DataCard['game']>>(() => {
  if (withdraw.value?.shop_item_category) {
    return {
      name: withdraw.value.shop_item_category.category,
      image_url: withdraw.value.shop_item_category.image_url,
    }
  }

  return null
})

// COPY BUTTON
const icon = ref<Icons>('copy-1')
const onClick = () => {
  navigator.clipboard
    .writeText(withdraw.value!.supplier_info!.supplier_roblox_username)
    .then(() => {
      console.log(
        'Referral link copied:',
        withdraw.value!.supplier_info!.supplier_roblox_username,
      )
    })
    .catch(err => {
      console.error('Failed to copy referral link:', err)
    })

  icon.value = 'check'
  setTimeout(() => {
    icon.value = 'copy-1'
  }, 2000)
}

onMounted(() => {
  if (!props.withdrawId) {
    emits('update:isOpen', false)
  }
})
</script>

<style scoped lang="scss">
.order-modal {
  &__wrapper {
    @include column(18px);

    height: 100%;
    position: relative;
    padding-top: 32px;
  }

  &__close {
    position: absolute;
    top: 16px;
    right: 0;
  }

  &__refresh {
    position: absolute;
    top: 16px;
    left: 0;
  }

  &__header {
    @include column(18px);

    align-items: center;
  }

  &__icon-wrapper {
    @include row;

    justify-content: center;
    width: 62px;
    height: 62px;
    background-color: var(--dark-700);
    border-radius: 22px;

    i {
      font-size: 28px;
      color: var(--green-500);
    }

    &--failed {
      i {
        color: var(--red-500);
      }
    }
  }

  &__text {
    @include column(2px);

    text-align: center;

    span:first-child {
      color: var(--white);
      font: var(--font-large-semibold);
    }

    span:last-child {
      font: var(--font-base-medium);
    }
  }

  &__content {
    @include column(18px);

    flex: 1 1 0;
  }

  &__timer {
    @include row(12px);

    justify-content: space-between;
    font: var(--font-base-medium);

    & > span {
      color: var(--white);
    }

    &-right {
      @include row(8px);
    }
  }

  &__specialist {
    @include row(12px);

    justify-content: space-between;
    font: var(--font-base-medium);

    &-title {
      color: var(--white);
    }

    &-data {
      @include row(8px);

      img {
        width: 28px;
        height: 28px;
      }
    }
  }

  &__footer {
    @include column(12px);

    padding-bottom: 20px;
  }
}
</style>
