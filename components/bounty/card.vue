<template>
  <ui-card :class="classes">
    <div class="bounty__left">
      <div class="bounty__sum title">
        + {{ sum }}
        <main-mascot size="xs" />
      </div>
      <span class="bounty__text description">{{ text }}</span>
    </div>
    <div class="bounty__right">
      <transition-fade>
        <div v-if="isDisabled" class="bounty__check">
          <ui-icon-base name="check" />
        </div>
        <ui-button-base
          v-else
          :text="buttonText"
          size="42"
          @click="emits('click')"
        />
      </transition-fade>
    </div>
  </ui-card>
</template>

<script setup lang="ts">
export type BountyCardProps = {
  sum: number
  text: string
  isInvite?: boolean
  type?: 'join' | 'invite' | 'boost' | 'buy'
  isDisabled?: boolean
}

type Emits = {
  (emit: 'click'): void
}

const { t } = useI18n()

const props = withDefaults(defineProps<BountyCardProps>(), {
  type: 'join',
})

const emits = defineEmits<Emits>()

const classes = computed(() => ['bounty', { 'is-disabled': props.isDisabled }])
const buttonText = computed(() => {
  return t(`coins.taskButton.${props.type}`)
})
</script>

<style scoped lang="scss">
.bounty {
  @include row(12px);

  justify-content: space-between;

  &__left {
    @include column;
  }

  &__sum {
    @include row(4px);

    &.is-disabled {
      color: var(--light-500);
    }
  }

  &__text {
    &.is-disabled {
      color: var(--dark-300);
    }
  }

  &__check {
    @include row;

    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 18px;
    font-size: 16px;
    background-color: var(--light-800);
    color: var(--white);
  }
}
</style>
