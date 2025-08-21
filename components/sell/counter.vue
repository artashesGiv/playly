<template>
  <div class="sell-counter">
    <ui-button-base
      size="42"
      :icon="minusIcon"
      :is-disabled="disable?.includes('remove')"
      @click="emit('remove')"
    />
    <div class="sell-counter__count">{{ count }}</div>
    <ui-button-base
      size="42"
      icon="plus"
      :is-disabled="disable?.includes('add')"
      @click="emit('add')"
    />
  </div>
</template>

<script setup lang="ts">
export type SellCounterProps = {
  count: number
  isOnlyDelete?: boolean
  disable?: ('add' | 'remove')[]
}

type Emit = (emit: 'add' | 'remove') => void

const props = defineProps<SellCounterProps>()
const emit = defineEmits<Emit>()

const minusIcon = computed<Icons>(() => {
  if (props.count === 1 || props.isOnlyDelete) {
    return 'delete-2'
  }

  return 'minus'
})
</script>
<style scoped lang="scss">
.sell-counter {
  @include row(8px);

  &__count {
    @include row;

    justify-content: center;
    flex-grow: 1;
    background-color: var(--dark-700);
    height: 42px;
    min-width: 42px;
    border-radius: 16px;
    font: var(--font-normal-semibold);
    color: var(--light-300);
  }
}
</style>
