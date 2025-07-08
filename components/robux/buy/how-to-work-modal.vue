<template>
  <ui-modal-base
    :is-open="isOpen"
    class="how-to-work"
    :title="$t('robux.buy.modal.title')"
    @update:is-open="emits('update:isOpen', $event)"
  >
    <div class="how-to-work__content">
      <div class="how-to-work__list">
        <robux-buy-step-card
          v-for="card in stepsData"
          :key="card.stepId"
          v-bind="card"
          :status="getStepStatus(card.stepId)"
        />
      </div>
      <ui-divider view="light" />
      <span>{{ $t('robux.buy.modal.description') }}</span>
      <ui-card class="how-to-work__price">
        <span class="how-to-work__price-description">
          {{ $t('robux.buy.modal.withdrawalCard') }}
        </span>
        <div class="how-to-work__price-value">
          {{ getValue }}
          <ui-icon-base name="robux" class="how-to-work__icon-robux" />
        </div>
      </ui-card>
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'
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
const { getValue, step } = storeToRefs(useRobuxBuyStore())

const stepsData: Omit<RobuxBuyStepCardProps, 'status'>[] = [
  {
    stepId: 1,
    title: t('robux.buy.modal.step-1.title'),
    description: t('robux.buy.modal.step-1.description'),
  },
  {
    stepId: 2,
    title: t('robux.buy.modal.step-2.title'),
    description: t('robux.buy.modal.step-2.description'),
  },
  {
    stepId: 3,
    title: t('robux.buy.modal.step-3.title'),
    description: t('robux.buy.modal.step-3.description'),
  },
  {
    stepId: 4,
    title: t('robux.buy.modal.step-4.title'),
    description: t('robux.buy.modal.step-4.description'),
  },
]

const getStepStatus = (stepId: number): RobuxBuyStepCardProps['status'] => {
  if (stepId < step.value) return 'completed'
  if (stepId === step.value) return 'in-progress'
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
