<template>
  <ui-table-data
    class="manager-withdraw-data"
    :list="withdrawData"
    :view="view"
  >
    <template #row-4="{ value }">
      <ui-input-base
        v-model="nickname"
        v-model:is-error="nicknameError"
        :placeholder="value"
        text-right
        class="manager-withdraw-data__input"
      />
    </template>
    <template #row-5>
      <ui-button-base
        :text="$t('profile.manager_data.data.copy_button')"
        :icon-right="icon"
        view="secondary-light"
        size="42"
        @click="onCopy"
      />
    </template>
  </ui-table-data>
</template>

<script setup lang="ts">
import type { PersonalCaseItem } from '@/types'
import { snakeToSentence } from '@/utils/snake-to-sentence'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import { useCopyManagerWithdrawData } from './-helpers'

export type ManagerWithdrawDataProps = {
  item: PersonalCaseItem
  withoutButton?: boolean
  view?: 'light' | 'dark'
}

const props = defineProps<ManagerWithdrawDataProps>()

const { t } = useI18n()

const nickname = ref('')
const nicknameError = ref(false)

const { icon, onCopyData } = useCopyManagerWithdrawData(props.item)

const onCopy = () => {
  if (!nickname.value) {
    nicknameError.value = true
  }
  onCopyData(nickname.value)
}

const withdrawData = computed<TableDataProps['list']>(() => [
  {
    title: t('profile.manager_data.data.name'),
    value: snakeToSentence(props.item.name || ''),
  },
  {
    title: t('profile.manager_data.data.id_withdraw'),
    value: props.item.manager_withdraw_info?.manager_withdraw_id || '',
  },
  {
    title: t('profile.manager_data.data.manager'),
    value: props.item.manager_withdraw_info?.manager_username || '',
  },
  {
    title: t('profile.manager_data.data.nickname'),
    value: t('profile.manager_data.data.nickname_placeholder'),
  },
  ...(!props.withoutButton
    ? [
        {
          title: '',
          value: '',
        },
      ]
    : []),
])
</script>
