import type { PersonalCaseItem } from '@/types'

export const useCopyManagerWithdrawData = (item: PersonalCaseItem) => {
  const icon = ref<Icons>('copy-1')

  const onCopyData = (nickname: string) => {
    navigator.clipboard
      .writeText(
        `- Предмет для вывода: ${snakeToSentence(item.name)}\n- ID вывода: ${item.manager_withdraw_info?.manager_withdraw_id}\n- Ваш менеджер: @${item.manager_withdraw_info?.manager_username}\n- Ваш ник в Роблокс - ${nickname}`,
      )
      .then(() => {
        console.log('Data for manager copied!')
      })
      .catch(err => {
        console.error('Failed to copy data for manager:', err)
      })

    icon.value = 'check'
    setTimeout(() => {
      icon.value = 'copy-1'
    }, 2000)
  }

  return {
    icon,
    onCopyData,
  }
}
