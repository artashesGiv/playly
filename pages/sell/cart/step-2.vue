<template>
  <div class="sell-cart-step-2">
    <div class="sell-cart-step-2__header">
      <div class="sell-cart-step-2__header-text">
        <span class="title">{{ $t('sell.cart.step-2.title') }}</span>
        <span class="description">
          {{ $t('sell.cart.step-2.description') }}
        </span>
      </div>
      <ui-divider />
    </div>
    <div class="sell-cart-step-2__content">
      <success-get-robux-card :get-value="totalSum" />
      <span class="description">
        {{ $t('sell.cart.step-2.alert') }}
      </span>
    </div>
    <div class="sell-cart-step-2__footer">
      <ui-button-base
        :text="$t('sell.cart.step-2.continue')"
        size="52"
        @click="onOpenMessages"
      />
      <ui-button-base
        :text="$t('sell.cart.step-2.how_it_work_button')"
        view="secondary"
        icon-right="information-circle"
        size="52"
        @click="isOpenModal = true"
      />
    </div>

    <sell-how-to-work-modal
      v-model:is-open="isOpenModal"
      class="sell-cart-step-2__modal"
    />
  </div>
</template>

<script setup lang="ts">
import { useSellStore } from '@/store'

definePageMeta({
  layout: 'empty',
})

useBackButton()

const isOpenModal = ref(false)

const { tg } = useTelegram()
const { totalSum, totalItems } = storeToRefs(useSellStore())
const { clearCart } = useSellStore()

onMounted(() => {
  if (totalItems.value === 0) {
    navigateTo('/sell')
  }
})

onBeforeUnmount(() => {
  clearCart()
})

const onOpenMessages = () => {
  tg.openTelegramLink('https://t.me/playlygg_bot')

  navigateTo('/sell')
}
</script>

<style scoped lang="scss">
.sell-cart-step-2 {
  @include column(18px);

  height: 100%;
  padding-top: 32px;

  .description {
    font: var(--font-base-medium);
  }

  &__header,
  &__content {
    @include column(18px);
  }

  &__header {
    &-text {
      @include column;

      text-align: center;
    }
  }

  &__content {
    flex: 1 1 auto;
  }

  &__footer {
    @include column(12px);
  }
}
</style>
