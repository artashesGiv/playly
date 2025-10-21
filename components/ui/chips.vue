<template>
  <div class="chips">
    <div
      v-for="item in list"
      :key="item.id"
      class="chips__item"
      :class="{ 'chips__item--active': modelValue.includes(item.id) }"
      @click="onClick(item.id)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Option } from '@/types'

export type ChipsProps = {
  modelValue: Option['id'][]
  list: Option[]
}

type Emits = {
  (e: 'update:model-value', value: ChipsProps['modelValue']): void
}

const props = defineProps<ChipsProps>()
const emit = defineEmits<Emits>()

const onClick = (id: Option['id']) => {
  if (props.modelValue.includes(id)) {
    emit(
      'update:model-value',
      props.modelValue.filter(item => item !== id),
    )
  } else {
    emit('update:model-value', [...props.modelValue, id])
  }
}
</script>

<style scoped lang="scss">
.chips {
  @include row(12px);

  flex-wrap: wrap;

  &__item {
    @include row(10px);

    height: 48px;
    padding: 0 18px;
    width: max-content;
    background-color: var(--dark-800);
    border-radius: 16px;
    font: var(--font-base-medium);
    cursor: pointer;
    transition: var(--transition-base);

    &--active {
      background-color: var(--light-600);
      color: var(--light-200);
    }
  }
}
</style>
