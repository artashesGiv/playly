<template>
  <ui-modal-base
    :is-open="isOpen"
    full-height
    without-header
    class="auth-modal"
    @update:is-open="emits('update:isOpen', $event)"
  >
    <div class="auth-modal__content">
      <h4 class="title">{{ $t('error404.title') }}</h4>
      <span class="font-normal-bold">
        {{ $t('error404.description') }}
      </span>
      <ui-button-base
        :text="$t('error404.button')"
        size="46"
        :loading="isLoading"
        class="auth-modal__button"
        @click="onClose"
      />
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
export type AuthModalProps = {
  isOpen: boolean
}

const isLoading = ref(false)

const { tg } = useTelegram()

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

defineProps<AuthModalProps>()
const emits = defineEmits<Emits>()

const onClose = async () => {
  tg.close()
}
</script>

<style scoped lang="scss">
.auth-modal {
  &__content {
    @include column(12px);

    width: 100%;
    align-items: center;
    text-align: center;
    align-self: center;
  }

  &__logo {
    width: 60px;
  }

  &__button {
    max-width: 400px;
  }
}
</style>
