<template>
  <ui-modal-base
    :is-open="isOpen"
    class="order-modal"
    full-height
    view="dark"
    without-header
  >
    <div v-if="item && shopItem && game" class="order-modal__wrapper">
      <ui-button-base
        view="secondary"
        icon="close"
        size="46"
        class="order-modal__close"
        @click="emits('update:isOpen', false)"
      />
      <div class="order-modal__header">
        <div class="order-modal__icon-wrapper">
          <ui-icon-base name="check-square" />
        </div>
        <div class="order-modal__text">
          <span>{{ $t(`market.steps.5.title`) }}</span>
          <span>{{ $t(`market.steps.5.headerDescription`) }}</span>
        </div>
      </div>
      <div class="order-modal__content">
        <shop-v2-withdraw-users
          v-if="isFindManager && item.supplier_info"
          :user="item.roblox_account"
          :supplier="item.supplier_info"
        />

        <ui-divider v-if="isFindManager && item.supplier_info" view="light" />

        <shop-v2-data-card :item="shopItem" :game="game" />
        <ui-divider v-if="isPaid || isInGame" view="light" />
        <span v-if="isPaid" class="font-base-medium">
          {{ $t('market.steps.5.steps.1.description') }}
        </span>
        <span v-if="isInGame" class="font-base-medium">
          {{ $t('market.steps.5.steps.3.description') }}
        </span>
      </div>
      <div class="order-modal__footer">
        <ui-card v-if="isPaid" class="order-modal__timer" view="light">
          <span>{{ $t('market.steps.5.steps.1.timer.title') }}</span>
          <div class="order-modal__timer-right">
            <span>{{ $t('market.steps.5.steps.1.timer.description') }}</span>
            <ui-spinner view="light" />
          </div>
        </ui-card>
        <template v-if="isFindManager && item.supplier_info">
          <ui-button-base
            :text="$t('market.steps.5.steps.2.buttons.link')"
            size="52"
            icon-right="foreign"
            @click="
              tg.openLink(
                `https://www.roblox.com/users/${item.supplier_info.supplier_id}/profile`,
              )
            "
          />
          <ui-button-base
            icon-right="copy-1"
            view="secondary-light"
            :text="item.supplier_info.supplier_roblox_username"
            size="52"
          />
        </template>
        <template v-if="isInGame">
          <ui-button-base
            :text="$t('market.steps.5.steps.3.buttons.link')"
            size="52"
            icon-right="foreign"
            @click="tg.openLink(item.supplier_info?.supplier_roblox_url || '')"
          />
        </template>
      </div>
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
import type { ShopV2SummaryStatus, ShopV2Withdraw } from '@/types'
import type { ShopV2DataCard } from '@/components/shop-v2/data-card.vue'

export type ShopV2OrderModalProps = {
  isOpen: boolean
  item: Maybe<ShopV2Withdraw>
} & {
  summaryStatus: ShopV2SummaryStatus
}

const { tg } = useTelegram()

type LocalStatus = 'paid' | 'find_manager' | 'in_game' | 'success' | 'failed'

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

const props = defineProps<ShopV2OrderModalProps>()
const emits = defineEmits<Emits>()

const shopItem = computed<Maybe<ShopV2DataCard['item']>>(() => {
  if (props.item) {
    return {
      name: props.item.shop_item_name,
      image_url: props.item.shop_item_image_url,
      data: props.item.data,
    }
  }

  return null
})

const localStatus = computed<LocalStatus>(() => {
  switch (props.summaryStatus) {
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
const isSuccess = computed(() => localStatus.value === 'success')
const isFailed = computed(() => localStatus.value === 'failed')

const game = computed<Maybe<ShopV2DataCard['game']>>(() => {
  if (props.item?.shop_item_category) {
    return {
      name: props.item.shop_item_category.category,
      image_url: props.item.shop_item_category.image_url,
    }
  }

  return null
})
</script>

<style scoped lang="scss">
.order-modal {
  &__wrapper {
    @include column(18px);

    height: 100%;
    position: relative;
    padding-top: 24px;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
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

  &__footer {
    @include column(12px);
  }
}
</style>
