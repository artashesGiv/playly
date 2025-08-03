<template>
  <ui-modal-base
    :is-open="isOpen"
    class="auth-modal"
    @update:is-open="emits('update:isOpen', $event)"
  >
    <div class="auth-modal__content">
      <nuxt-img src="/images/main/logo.png" class="auth-modal__logo" />
      <h4 class="title">{{ $t('auth.title') }}</h4>
      <span class="auth-modal__description">{{ $t('auth.description') }}</span>
      <ui-button-base
        :text="$t('auth.button')"
        size="46"
        :loading="isLoading"
        icon-right="telegram"
        @click="onLogin"
      />
      <span class="description">{{ $t('auth.alert') }}</span>
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'

export type AuthModalProps = {
  isOpen: boolean
}

const isLoading = ref(false)

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

defineProps<AuthModalProps>()
const emits = defineEmits<Emits>()

const { login } = useAuthStore()

const onLogin = async () => {
  try {
    isLoading.value = true
    await login('')
    navigateTo('/')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.auth-modal {
  &__content {
    @include column(12px);

    align-items: center;
    text-align: center;
  }

  &__logo {
    width: 60px;
  }

  &__description {
    font: var(--font-small-medium);
  }
}
</style>
