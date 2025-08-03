<template>
  <div :class="classes">{{ text }}</div>
</template>

<script setup lang="ts">
import type { CaseItemAbilities } from '@/types'

export type CaseItemAbilityProps = {
  type: CaseItemAbilities
}

const props = defineProps<CaseItemAbilityProps>()

const textMap: Record<CaseItemAbilities, string> = {
  'flyable': 'F',
  'rideable': 'R',
  'neon': 'N',
  'mega-neon': 'M',
}

const text = computed(() => textMap[props.type])
const classes = computed(() => ['ability', `ability--type--${props.type}`])
</script>

<style scoped lang="scss">
.ability {
  @include row;

  display: inline-flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: var(--white);
  font-size: 12px;
  font-weight: 600;
  padding-top: 1px;

  &--type {
    &--flyable {
      background-color: var(--primary-500);
    }
    &--rideable {
      background-color: var(--pink-500);
    }
    &--neon {
      background-color: var(--green-500);
    }
    &--mega-neon {
      background-color: #7e10d4;
      border-radius: 4px;
    }
  }
}
</style>
