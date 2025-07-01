<template>
  <transition name="slide-bottom">
    <div v-if="isOpen" class="modal">
      <div class="modal__header">
        <span class="title">{{ $t('robux.buy.modal.title') }}</span>
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
  </transition>
</template>

<script setup lang="ts">
export type ModalProps = {
  isOpen: boolean
}

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

defineProps<ModalProps>()
const emits = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.modal {
  @include column(18px);

  border-radius: 18px 18px 0 0;
  padding: 20px 16px;
  background-color: var(--dark-900);

  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  &__header {
    @include row(12px);

    justify-content: space-between;
  }
}
</style>
