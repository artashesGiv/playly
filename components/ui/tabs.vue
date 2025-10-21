<template>
  <div class="tabs" :class="{ 'no-scroll': noScroll }">
    <div class="tabs__wrapper-list">
      <div class="tabs__list">
        <div
          v-for="item in list"
          :key="item.id"
          class="tabs__item"
          :class="{
            'is-active': modelValue === item.id,
            'is-disabled': disabledIds?.includes(item.id),
          }"
          @click="emits('update:modelValue', item.id)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export type TabItem<T = string | number> = { id: T; text: string }

export type TabsProps<T = string | number> = {
  modelValue: TabItem['id']
  list: TabItem<T>[]
  noScroll?: boolean
  disabledIds?: TabItem['id'][]
}

type Emits = {
  (e: 'update:modelValue', value: TabItem['id']): void
}

defineProps<TabsProps>()
const emits = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.tabs {
  $b: &;

  @include scroll-gradient-left;

  &__wrapper-list {
    overflow-x: auto;
    position: relative;
  }

  &__list {
    @include row(8px);
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

    &.is-disabled {
      @include disabled;

      opacity: 0.3;
    }
  }

  &.no-scroll {
    #{$b}__list {
      flex-wrap: wrap;
    }
  }
}
</style>
