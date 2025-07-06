<template>
  <div class="items">
    <ui-title
      :text="titleMap[type]"
      :additional-text="$t('common.items', listMap[type].length)"
    />
    <div class="items__list">
      <case-item
        v-for="item in listMap[type]"
        :key="item.id"
        v-bind="item"
        @click="navigateTo(`/case-item/${item.id}`)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from '@/store'
import type { CaseItem } from '@/types'

export type CaseItemListProps = {
  type: 'own' | 'received'
}

defineProps<CaseItemListProps>()
const { t } = useI18n()

const { receivedList, ownList } = storeToRefs(useItemsStore())

const titleMap: Record<CaseItemListProps['type'], string> = {
  own: t('profile.items.your'),
  received: t('profile.items.received'),
}

const listMap = computed<Record<CaseItemListProps['type'], CaseItem[]>>(() => ({
  own: ownList.value,
  received: receivedList.value,
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
