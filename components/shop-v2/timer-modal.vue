<template>
  <ui-modal-base
    :is-open="isOpen"
    class="timer-modal"
    :title="$t('market.timerModal.modalTitle')"
    @update:is-open="emits('update:isOpen', false)"
  >
    <div class="timer-modal__content">
      <div class="timer-modal__icon-wrapper">
        <ui-icon-base name="timer" />
      </div>
      <div class="timer-modal__text">
        <span>{{ $t('market.timerModal.title') }}</span>
        <span>{{ $t('market.timerModal.description') }}</span>
      </div>
      <ui-button-base
        size="52"
        :text="$t('market.timerModal.button')"
        @click="emits('update:isOpen', false)"
      />
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
export type ShopV2TimerModalProps = {
  isOpen: boolean
}

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

defineProps<ShopV2TimerModalProps>()
const emits = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.timer-modal {
  &__content {
    @include column(14px);

    align-items: center;
  }

  &__icon-wrapper {
    @include row;

    justify-content: center;
    width: 90px;
    height: 90px;
    background-color: var(--dark-700);
    border-radius: 50%;

    i {
      font-size: 46px;
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
