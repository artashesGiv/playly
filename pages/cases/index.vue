<template>
  <div class="cases">
    <cases-mian-card />
    <ui-divider />
    <ui-tabs
      v-model="currentTab"
      :list="tabs"
      no-scroll
      @update:model-value="onInput($event as CaseCategory & 'all')"
    />
    <transition-fade>
      <div :key="currentTab" class="cases__list">
        <cases-card
          v-for="item in sortableCases"
          :key="item.id"
          v-bind="item"
          :custom-tag="getCustomTag(item)"
          :image="item.image_url || '/images/template/template.png'"
          @click="navigateTo(`/cases/${item.id}`)"
        />
      </div>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import type { TabsProps } from '@/components/ui/tabs.vue'
import { useCasesStore } from '@/store'
import type { Case, CaseCategory } from '@/types'
import type { TagProps } from '@/components/ui/tag.vue'

const { sortableCases, currentTab } = storeToRefs(useCasesStore())
const { getCases } = useCasesStore()

const tabs: TabsProps['list'] = [
  {
    id: 'all',
    text: 'All',
  },
  {
    id: 'growagarden',
    text: 'GrowaGarden',
  },
  {
    id: 'adopt_me',
    text: 'AdoptMe',
  },
  {
    id: 'robux',
    text: 'Robux',
  },
  {
    id: 'mm2',
    text: 'MM2',
  },
]

const onInput = async (category: CaseCategory & 'all') => {
  if (category !== 'all') {
    await getCases({ category: category })
  } else {
    await getCases()
  }
}

const getCustomTag = (item: Case): TagProps | undefined => {
  if (item.category === 'growagarden' && item.price === 500) {
    return {
      color: 'purple',
      text: 'Robux',
    }
  }
}
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
