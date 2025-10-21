<template>
  <div class="orders">
    <back-header
      :title="$t('market.orders.header.title')"
      :description="$t('market.orders.header.description')"
      class="orders__header"
      :on-click="() => navigateTo('/profile')"
    />
    <div v-if="!loading" class="orders__content">
      <empty-search-block
        v-if="isEmpty"
        :title="$t('market.orders.empty.title')"
        :description="$t('market.orders.empty.description')"
        :button-text="$t('market.orders.empty.button')"
        @clear="navigateTo('/shop-v2')"
      />
      <template v-else>
        <div class="orders__list">
          <ui-card
            v-for="item in allWithdraws"
            :key="item.id"
            class="orders__item"
            @click="openOrder(item)"
          >
            <shop-v2-item-card
              size="xs"
              :image_url="item.shop_item_image_url"
              :data="item.data"
            />
            <div class="orders__item-text">
              <span>{{ snakeToSentence(item.shop_item_name) }}</span>
              <span>{{ summaryStatusTextMap[getSummaryStatus(item)] }}</span>
            </div>
          </ui-card>
        </div>
      </template>
    </div>
    <ui-spinner v-else size="xl" class="orders__spinner" />
    <div v-if="!loading" class="orders__footer">
      <span>{{ $t('market.orders.description') }}</span>
    </div>

    <shop-v2-order-modal
      v-model:is-open="isOpen"
      :item="currentWithdraw!"
      :summary-status="currentWithdrawStatus || 'order_created'"
      @update:is-open="currentWithdraw = null"
    />
  </div>
</template>

<script setup lang="ts">
import { useShopV2FlowStore, useShopV2Store } from '@/store'
import type { ShopV2SummaryStatus, ShopV2Withdraw } from '@/types'

definePageMeta({
  layout: 'empty',
})

const route = useRoute()

const withdrawId = route.query.withdraw_id as string

const { getWithdraws } = useShopV2Store()
const { allWithdraws, allWithdrawsPool, isVisitOrders } =
  storeToRefs(useShopV2Store())
const { isOpenOrder } = storeToRefs(useShopV2FlowStore())

const { t } = useI18n()

const currentWithdraw = ref<Maybe<ShopV2Withdraw>>(null)

const currentWithdrawStatus = computed(() => {
  if (!currentWithdraw.value) return

  return getSummaryStatus(currentWithdraw.value)
})

const loading = useKeyLoading('get-market-orders')
const isEmpty = computed(() => !loading.value && !allWithdraws.value.length)

const isOpen = computed<boolean>({
  get: () => !!(isOpenOrder.value && currentWithdraw.value),
  set: (value: boolean) => {
    if (!value) {
      currentWithdraw.value = null
    }
    isOpenOrder.value = value
  },
})

const openOrder = (item: ShopV2Withdraw) => {
  currentWithdraw.value = item
  isOpenOrder.value = true
}

const getSummaryStatus = ({
  status,
  category_status,
}: ShopV2Withdraw): ShopV2SummaryStatus => {
  if (status === 'paid' && !category_status) {
    return 'paid'
  }

  if (status === 'in_withdraw_progress') {
    if (!category_status) {
      return 'order_created'
    }

    if (category_status === 'paid') {
      return 'find_manager'
    }
    if (category_status === 'friend') {
      return 'friend'
    }
    if (category_status === 'in_game') {
      return 'in_game'
    }
  }

  return 'order_created'
}

const summaryStatusTextMap: Record<ShopV2SummaryStatus, string> = {
  paid: t('market.withdraw_statuses.paid'),
  order_created: t('market.withdraw_statuses.order_created'),
  find_manager: t('market.withdraw_statuses.find_manager'),
  friend: t('market.withdraw_statuses.friend'),
  in_game: t('market.withdraw_statuses.in_game'),
  success: t('market.withdraw_statuses.success'),
  failed: t('market.withdraw_statuses.failed'),
}

onMounted(async () => {
  if (!allWithdraws.value.length) {
    await getWithdraws()
  }

  isVisitOrders.value = true

  if (withdrawId) {
    const order = allWithdrawsPool.value[withdrawId]

    if (order) {
      openOrder(order)
    }
  }
})
</script>

<style scoped lang="scss">
.orders {
  @include column(18px);
  position: relative;

  padding-top: 16px;
  height: 100%;

  &__content {
    flex: 1 1 0;
    position: relative;
    overflow: auto;
  }

  &__list {
    @include column(12px);
  }

  &__footer {
    padding-bottom: 16px;
  }

  &__spinner {
    @include center;
  }

  &__item {
    @include row(12px);

    cursor: pointer;
  }

  &__item-text {
    @include column;

    span:first-child {
      color: var(--white);
      font: var(--font-base-semibold);
    }

    span:last-child {
      font: var(--font-base-medium);
    }
  }
}
</style>
