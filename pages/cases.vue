<template>
  <div class="cases">
    <cases-mian-card />
    <ui-divider />
    <ui-tabs v-model="currentTab" :list="tabs" />
    <div class="cases__list-wrapper">
      <div class="cases__list">
        <cases-card v-for="item in cases" :key="item.id" v-bind="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabsProps } from '@/components/ui/tabs.vue'
import { useCasesStore } from '@/store'

const currentTab = ref(1)

const { cases } = storeToRefs(useCasesStore())

const tabs: TabsProps['list'] = [
  {
    id: 1,
    text: 'All',
  },
  {
    id: 2,
    text: 'Robux',
  },
  {
    id: 3,
    text: 'Pets',
  },
  {
    id: 4,
    text: 'Eggs',
  },
  {
    id: 5,
    text: 'Robux',
  },
  {
    id: 6,
    text: 'Pets',
  },
]
</script>

<style scoped lang="scss">
.cases {
  @include column(18px);
  @include scroll-gradient;

  height: 100%;

  &__list-wrapper {
    overflow-y: auto;
    height: 100%;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
