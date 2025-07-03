<template>
  <div class="item-case" :class="{ 'is-active': isActive }">
    <div class="item-case__tags">
      <ui-tag :text="rarity" view="pink" />
      <ui-tag :text="`${probability.toFixed(2)}%`" view="dark" />
    </div>
    <nuxt-img :src="image_url" class="item-case__image" />
    <h5 class="item-case__title">{{ name }}</h5>
    <span class="item-case__description">{{ item_type }}</span>
    <cases-item-abilities
      :flyable="flyable"
      :rideable="rideable"
      class="item-case__abilities"
    />
  </div>
</template>

<script setup lang="ts">
import type { CaseItem } from '@/types'

export type CaseRouletteItemCardProps = {
  crystal_price: CaseItem['crystal_price']
  id: CaseItem['id']
  image_url: CaseItem['image_url']
  item_type: CaseItem['item_type']
  name: CaseItem['name']
  probability: CaseItem['probability']
  rarity: CaseItem['rarity']
  flyable: CaseItem['flyable']
  pumping: CaseItem['pumping']
  rideable: CaseItem['rideable']
  isActive?: boolean
}

defineProps<CaseRouletteItemCardProps>()
</script>

<style scoped lang="scss">
.item-case {
  @include column;

  position: relative;
  align-items: center;
  text-align: center;
  border-radius: 22px;
  background-color: var(--dark-900);
  padding: 18.5px 12px;
  transition: var(--transition-base);

  &__tags {
    @include row(6px);

    position: absolute;
    top: 12px;
    right: 12px;
  }

  &__title {
    font: var(--font-base-semibold);
    color: var(--white);
    margin-top: 8px;
  }

  &__description {
    font: var(--font-normal-medium);
  }

  &__image {
    width: 90px;
    height: 90px;
  }

  &__abilities {
    margin-top: 12px;
  }

  &.is-active {
    background-color: var(--dark-700);
  }
}
</style>
