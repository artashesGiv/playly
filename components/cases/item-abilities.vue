<template>
  <div v-if="items.length" class="abilities">
    <cases-item-ability v-for="item in items" :key="item" :type="item" />
  </div>
</template>

<script setup lang="ts">
import type { CaseItem, CaseItemAbilities } from '@/types'

export type ItemAbilitiesProps = {
  flyable: CaseItem['flyable']
  rideable: CaseItem['rideable']
}

const props = defineProps<ItemAbilitiesProps>()

const items = computed<CaseItemAbilities[]>(() => {
  const list: CaseItemAbilities[] = []

  if (props.flyable) {
    list.push('flyable')
  }

  if (props.rideable) {
    list.push('rideable')
  }

  return list
})
</script>

<style scoped lang="scss">
.abilities {
  @include row(6px);

  margin-top: 12px;
}
</style>
