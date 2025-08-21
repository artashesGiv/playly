<template>
  <div class="items">
    <ui-title
      :text="$t(`profile.items.${type}`)"
      :additional-text="$t('common.items', listMap[type].length)"
    />
    <div class="items__list">
      <case-item-card
        v-for="item in listMap[type]"
        :key="item.id"
        v-bind="item"
        :name="shopItemNameMap[item.name] || snakeToSentence(item.name)"
        @click="navigateTo(`/case-item/${item.id}`)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from '@/store'
import type { CaseItem } from '@/types'
import { shopItemNameMap } from '@/pages/shop/-helpers'

export type CaseItemListProps = {
  type: 'own' | 'sold' | 'in_withdraw_progress' | 'withdraw_success'
}

defineProps<CaseItemListProps>()

const { ownList, soldList, withdrawProcessList, withdrawSuccessList } =
  storeToRefs(useItemsStore())

const listMap = computed<Record<CaseItemListProps['type'], CaseItem[]>>(() => ({
  own: ownList.value,
  sold: soldList.value,
  in_withdraw_progress: withdrawProcessList.value,
  withdraw_success: withdrawSuccessList.value,
}))
</script>

<style scoped lang="scss">
.items {
  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}
</style>
