<template>
  <ui-modal-base
    :is-open="isOpen"
    class="how-to-work"
    :title="$t('market.modal.title')"
    @update:is-open="emits('update:isOpen', $event)"
  >
    <div class="how-to-work__content">
      <div class="how-to-work__list">
        <shop-v2-step-card
          v-for="card in stepsData"
          :key="card.stepId"
          v-bind="card"
          :status="getStepStatus(card.stepId)"
        />
      </div>
      <ui-divider view="light" />
      <span>{{ $t('market.modal.description') }}</span>
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
import { useShopV2FlowStore } from '@/store'
import type { RobuxBuyStepCardProps } from '@/components/robux/buy/step/card.vue'

export type HowToWorkModalProps = {
  isOpen: boolean
}

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

defineProps<HowToWorkModalProps>()
const emits = defineEmits<Emits>()

const { t } = useI18n()
const { currentStep } = storeToRefs(useShopV2FlowStore())

const stepsData: Omit<RobuxBuyStepCardProps, 'status'>[] = [
  {
    stepId: 1,
    title: t('market.steps.1.title'),
    description: t('market.steps.1.description'),
  },
  {
    stepId: 2,
    title: t('market.steps.2.title'),
    description: t('market.steps.2.description'),
  },
  {
    stepId: 3,
    title: t('market.steps.3.title'),
    description: t('market.steps.3.description'),
  },
  {
    stepId: 4,
    title: t('market.steps.4.title'),
    description: t('market.steps.4.description'),
  },
]

const getStepStatus = (stepId: number): RobuxBuyStepCardProps['status'] => {
  if (stepId < currentStep.value) return 'completed'
  if (stepId === currentStep.value) return 'in-progress'
  return 'base'
}
</script>

<style scoped lang="scss">
.how-to-work {
  &__content {
    @include column(14px);

    span {
      font: var(--font-base-medium);
    }
  }

  &__list {
    @include column(10px);
  }

  &__price {
    @include row(12px);

    justify-content: space-between;
    background-color: var(--dark-700);

    &-value {
      @include row(5px);

      font: var(--font-base-semibold);
      color: var(--white);
    }

    &-description {
      font: var(--font-base-medium);
    }
  }

  &__icon-robux {
    font-size: 18px;
    color: var(--yellow-500);
  }
}
</style>
