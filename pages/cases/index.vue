<template>
  <div class="cases">
    <cases-mian-card />
    <ui-divider />
    <ui-tabs
      v-model="currentTab"
      :list="tabs"
      @update:model-value="onInput($event as CaseCategory)"
    />
    <div class="cases__list">
      <cases-card
        v-for="item in cases"
        :key="item.id"
        v-bind="item"
        :image="item.image_url || '/images/template/template.png'"
        @click="navigateTo(`/cases/${item.id}`)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabsProps } from '@/components/ui/tabs.vue'
import { useCasesStore } from '@/store'
import type { CaseCategory } from '@/types'

const currentTab = ref('all')

const { getCases } = useCasesStore()
const { cases } = storeToRefs(useCasesStore())

const tabs: TabsProps['list'] = [
  {
    id: 'all',
    text: 'All',
  },
  {
    id: 'robux',
    text: 'Robux',
  },
  // {
  //   id: 'pets',
  //   text: 'Pets',
  // },
  // {
  //   id: 'eggs',
  //   text: 'Eggs',
  // },
]

const onInput = async (category: CaseCategory & 'all') => {
  if (category !== 'all') {
    await getCases({ category: category })
  } else {
    await getCases()
  }
}

onMounted(async () => {
  await getCases()
})
</script>

<style scoped lang="scss">
.cases {
  @include column(18px);

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
