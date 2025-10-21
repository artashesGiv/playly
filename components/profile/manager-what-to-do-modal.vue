<template>
  <ui-modal-base
    :is-open="isOpen"
    class="what-to-do"
    :title="$t('profile.manager_data.what_to_do_modal.title')"
    @update:is-open="emits('update:isOpen', $event)"
  >
    <div class="what-to-do__content">
      <profile-manager-withdraw-data :item="item" without-button view="light" />

      <span class="what-to-do__alert">
        {{ $t('profile.manager_data.what_to_do_modal.alert') }}
      </span>

      <div class="what-to-do__buttons">
        <ui-button-base
          :text="
            $t('profile.manager_data.what_to_do_modal.chat_button', {
              chat_id: `@${item.manager_withdraw_info?.manager_username}`,
            })
          "
          size="52"
          icon-right="foreign"
          @click="
            tg.openTelegramLink(
              `https://t.me/${item.manager_withdraw_info?.manager_username}`,
            )
          "
        />
        <ui-button-base
          :text="$t('profile.manager_data.what_to_do_modal.copy_button')"
          view="secondary-light"
          :icon-right="icon"
          size="52"
          @click="onCopyData"
        />
      </div>
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
import type { PersonalCaseItem } from '@/types'
import { useCopyManagerWithdrawData } from './-helpers'

export type WhatToDoModalProps = { isOpen: boolean; item: PersonalCaseItem }

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

const { tg } = useTelegram()

const emits = defineEmits<Emits>()
const props = defineProps<WhatToDoModalProps>()

const { icon, onCopyData } = useCopyManagerWithdrawData(props.item)
</script>

<style scoped lang="scss">
.what-to-do {
  &__content {
    @include column(18px);
  }

  &__alert {
    font: var(--font-base-medium);
  }

  &__buttons {
    @include column(12px);
  }
}
</style>
