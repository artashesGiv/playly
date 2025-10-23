<template>
  <div class="shop-v2-flow">
    <back-header
      :title="$t(`market.steps.${currentStep}.title`)"
      class="shop-v2-flow__header"
      :description="$t(`market.steps.${currentStep}.headerDescription`)"
      :on-click="prevStep"
    />
    <div class="shop-v2-flow__content">
      <transition-fade>
        <component :is="stepComponents[currentStep]" :key="currentStep" />
      </transition-fade>
    </div>
    <shop-v2-footer class="shop-v2-flow__step-footer">
      <template v-if="currentStep === 4" #button>
        <ui-button-base
          size="52"
          :text="payButtonText"
          :is-disabled="isOpenPaid"
          :loading="loading"
          @click="nextStep"
        />
      </template>
    </shop-v2-footer>
  </div>
</template>

<script setup lang="ts">
import { useShopV2FlowStore } from '@/store'
import { currencyPrefix } from '@/assets/content/currency'
import type { ShopV2Item } from '@/types'

definePageMeta({
  layout: 'empty',
})

const { t } = useI18n()

const { currentStep, marketFlowData, isOpenPaid } =
  storeToRefs(useShopV2FlowStore())
const { prevStep, nextStep, getSummaryPrice } = useShopV2FlowStore()

const currentItem = computed<ShopV2Item>(() => marketFlowData.value.item!)

const stepComponents = computed(() => ({
  1: defineAsyncComponent(() => import('@/components/shop-v2/step/1.vue')),
  2: defineAsyncComponent(() => import('@/components/shop-v2/step/2.vue')),
  3: defineAsyncComponent(() => import('@/components/shop-v2/step/3.vue')),
  4: defineAsyncComponent(() => import('@/components/shop-v2/step/4.vue')),
}))

const loading = useKeyLoading('buy-item')

onMounted(async () => {
  if (!marketFlowData.value.game || !marketFlowData.value.item) {
    navigateTo('/shop-v2')
  }
})

const payButtonText = computed(() =>
  !isOpenPaid.value
    ? `${t('market.steps.4.buttonPay')} ${getSummaryPrice(currentItem.value)} ${currencyPrefix.RUB}`
    : t('market.steps.4.buttonWait'),
)

function handleBack() {
  if (marketFlowData.value.step === 1) {
    navigateTo('/shop-v2')
  } else {
    prevStep()
  }
}

useBackButton(handleBack)
</script>

<style scoped lang="scss">
.shop-v2-flow {
  @include column(16px);

  padding-top: 16px;
  padding-bottom: 16px;
  height: 100%;

  &__content {
    flex: 1 1 0;
    overflow: auto;
  }

  &__step-footer {
    padding-bottom: 0;
  }
}
</style>
