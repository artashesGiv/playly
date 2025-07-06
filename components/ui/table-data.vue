<template>
  <ui-card class="table">
    <template v-for="(item, index) in list" :key="index">
      <div class="table__row">
        <span v-if="item.title" class="table__title">{{ item.title }}</span>
        <div class="table__value">
          <slot :name="`row-${index + 1}`" :value="item.value">
            {{ item.value }}
          </slot>
        </div>
      </div>
      <ui-divider v-if="index !== list.length - 1" view="light" />
    </template>
  </ui-card>
</template>

<script setup lang="ts">
export type TableDataProps = {
  list: { title: string; value: any }[]
}

defineProps<TableDataProps>()
</script>

<style scoped lang="scss">
.table {
  @include column(14px);

  align-self: stretch;

  &__row {
    @include row(12px);

    justify-content: space-between;

    span:first-child {
      font: var(--font-base-medium);
      color: var(--white);
    }
  }

  &__value {
    font: var(--font-base-medium);
  }
}
</style>
