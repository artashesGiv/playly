<template>
  <div class="tabs">
    <div class="tabs__wrapper-list">
      <div
        v-for="item in list"
        :key="item.id"
        class="tabs__item"
        :class="{ 'is-active': modelValue === item.id }"
        @click="emits('update:modelValue', item.id)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type TabItem = { id: number | string; text: string }

export type TabsProps = {
  modelValue: TabItem['id']
  list: TabItem[]
}

type Emits = {
  (e: 'update:modelValue', value: TabItem['id']): void
}

defineProps<TabsProps>()
const emits = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.tabs {
  @include scroll-gradient-left;

  &__wrapper-list {
    @include row(8px);
    overflow-x: auto;
    position: relative;
  }

  &__item {
    @include row;

    padding: 0 24px;
    background-color: var(--dark-800);
    height: 46px;
    border-radius: 16px;
    font: var(--font-normal-semibold);
    transition: var(--transition-base);
    cursor: pointer;
    white-space: nowrap;

    &.is-active {
      background-color: var(--dark-600);
      color: var(--white);
    }
  }
}
</style>
