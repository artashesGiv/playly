<template>
  <transition-height>
    <div :class="classes">
      <div class="step-card__left">
        <div class="step-card__icon">
          <ui-icon-base
            v-if="!isBase"
            :name="isComplete ? 'check' : 'loader-2'"
          />
        </div>
      </div>
      <div class="step-card__right">
        <h4>{{ title }}</h4>
        <span v-if="isInProgress">{{ description }}</span>
      </div>
    </div>
  </transition-height>
</template>

<script setup lang="ts">
export type RobuxBuyStepCardProps = {
  stepId: number
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'base'
}

const props = defineProps<RobuxBuyStepCardProps>()

const classes = computed(() => [
  'step-card',
  `step-card--status--${props.status}`,
])

const isInProgress = computed(() => props.status === 'in-progress')
const isComplete = computed(() => props.status === 'completed')
const isBase = computed(() => props.status === 'base')
</script>

<style scoped lang="scss">
.step-card {
  $b: &;

  @include row(12px);

  align-items: flex-start;

  background-color: var(--dark-800);
  padding: 12px;
  border-radius: 22px;

  &__icon {
    @include row;

    justify-content: center;
    width: 38px;
    height: 38px;
    background-color: var(--dark-500);
    border-radius: 12px;

    i {
      font-size: 20px;
    }
  }

  &__right {
    @include column(2px);

    h4 {
      font: var(--font-base-semibold);
      color: var(--white);
    }

    span {
      font: var(--font-base-medium);
    }
  }

  &--status {
    &--in-progress {
      #{$b}__icon {
        background-color: var(--primary-500);

        i {
          color: var(--white);
          animation: rotate360 1s linear infinite;
        }
      }
    }
  }
}
</style>
