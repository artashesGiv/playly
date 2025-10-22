<template>
  <div>
    <transition name="slide-bottom">
      <teleport to="body">
        <div
          v-if="isOpen"
          class="modal"
          :class="[{ 'is-full-height': fullHeight }, `modal--view--${view}`]"
        >
          <div v-if="!withoutHeader" class="modal__header">
            <span class="title">{{ title }}</span>
            <ui-button-base
              view="secondary"
              icon="close"
              size="46"
              @click="emits('update:isOpen', false)"
            />
          </div>
          <div class="modal__content">
            <slot />
          </div>
        </div>
      </teleport>
    </transition>
  </div>
</template>

<script setup lang="ts">
export type ModalProps = {
  isOpen: boolean
  title?: string
  fullHeight?: boolean
  view?: 'light' | 'dark'
  withoutHeader?: boolean
}

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

withDefaults(defineProps<ModalProps>(), {
  title: '',
  view: 'light',
})
const emits = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.modal {
  @include column(18px);

  border-radius: 18px 18px 0 0;
  padding: 20px 16px;

  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  max-height: 90vh;

  &--view {
    &--light {
      background-color: var(--dark-900);
    }

    &--dark {
      background-color: var(--dark-1000);
    }
  }

  &.is-full-height {
    min-height: 100vh;
    padding-top: calc(
      var(--tg-content-safe-area-inset-top) + var(--tg-safe-area-inset-top)
    );
    padding-bottom: calc(
      var(--tg-content-safe-area-inset-bottom) +
        var(--tg-safe-area-inset-bottom)
    );
    border-radius: 0;

    .modal__content {
      flex: 1 1 0;
    }
  }

  &__header {
    @include row(12px);

    justify-content: space-between;
  }

  &__content {
    overflow: auto;
    position: relative;

    margin-bottom: -16px;
    padding-bottom: 16px;
  }
}
</style>
