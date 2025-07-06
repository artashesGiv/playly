<template>
  <div class="item-case" :class="{ 'is-active': isActive }">
    <div class="item-case__tags">
      <ui-tag
        v-if="rarity"
        :text="$t(`rarity.${rarity}`)"
        :view="mapRareColor[rarity]"
      />
    </div>
    <nuxt-img :src="image_url" class="item-case__image" />
    <h5 class="item-case__title">{{ snakeToSentence(name) }}</h5>
    <span v-if="item_type" class="item-case__description">{{
      snakeToSentence(item_type)
    }}</span>
    <cases-item-abilities
      v-if="flyable || rideable"
      :flyable="flyable"
      :rideable="rideable"
      class="item-case__abilities"
    />
  </div>
</template>

<script setup lang="ts">
import type { CaseItem } from '@/types'

export type CaseRouletteItemCardProps = {
  image_url: CaseItem['image_url']
  item_type?: CaseItem['item_type']
  name: CaseItem['name']
  rarity?: CaseItem['rarity']
  flyable?: CaseItem['flyable']
  rideable?: CaseItem['rideable']
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
