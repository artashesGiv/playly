<template>
  <div class="shop-v2-footer">
    <ui-stauts-bar :min="1" :max="5" :progress="currentStep" />
    <div class="shop-v2-footer__step-description" @click="isOpenModal = true">
      <span class="shop-v2-footer__title font-base-medium">
        {{ $t(`market.steps.${currentStep}.title`) }}
      </span>
      <div class="shop-v2-footer__step-description-right font-base-medium">
        <span>{{ $t('common.step', { n: currentStep }) }}</span>
        <ui-spinner size="s" view="light" />
      </div>
    </div>
    <slot name="button">
      <ui-button-base
        v-if="!withoutContinue"
        size="52"
        :text="$t('common.continue')"
        @click="nextStep"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useShopV2FlowStore } from '@/store'

export type ShopV2FooterProps = {
  withoutContinue?: boolean
}

defineProps<ShopV2FooterProps>()

const { nextStep } = useShopV2FlowStore()

const { currentStep, isOpenModal } = storeToRefs(useShopV2FlowStore())
</script>

<style scoped lang="scss">
.shop-v2-footer {
  @include column(12px);

  flex-shrink: 0;
  padding-bottom: 16px;

  &__title {
    color: var(--white);
  }

  &__step-description {
    @include row(12px);

    justify-content: space-between;
    border-radius: 18px;
    background-color: var(--dark-800);
    padding: 14px;
    cursor: pointer;

    &-right {
      @include row(8px);
    }
  }
}
</style>
